import React,{useEffect,useState} from "react"
import "./Home.css"
import { Input, Select, Table } from "antd";
import {useNavigate} from "react-router-dom";
import {message,Modal,Form} from "antd";
import axios from "axios";
import Spinner from "../../components/Spinner";
import moment from "moment";
import { AreaChartOutlined, DeleteFilled, EditFilled, UnorderedListOutlined, UserOutlined } from '@ant-design/icons'
import Analytics from "../../components/Analytics";
import PersonIcon from '@mui/icons-material/Person';

export default function Home(){
    //to display username 
    const [loginUser,setLoginUser]=useState('')
    const navigate=useNavigate();
    useEffect(()=>{
      const user=JSON.parse(localStorage.getItem('user'))
      if(user){
        setLoginUser(user);
      }
    },[])

    const logoutHandler=()=>{
        localStorage.removeItem("user")
        message.success('Logout successfully');
        navigate('/login')
    }

    //to show modal
    const [showModal,setModal]=useState(false);
     
    //form handling of transaction
    const [loading,setLoading]=useState(false);
    const [editable,setEditable]=useState(null);

    //delete handler
    const handleDelete=async (record)=>{
        try{
            setLoading(true)
             await axios.post("/transactions/delete-transaction",{transactionId:record._id})
            setLoading(false)
            message.success("Transaction deleted!")
        }catch(error){
            setLoading(false)
            console.log(error)
            message.error("Not able to delete")
        }
    }

    const handleSubmit=async (values)=>{
        try{
          const user=JSON.parse(localStorage.getItem('user'))
          setLoading(true);
          if(editable){
            await axios.post('/transactions/edit-transaction',{ 
                payload:{
                    ...values,
                    userid:user._id
                },
                transactionId:editable._id,
            });
            setLoading(false);
            message.success("Transaction Updated successufully");
          }else{
            await axios.post('/transactions/add-transaction',{...values,userid:user._id})
            setLoading(false);
            message.success("Transaction added successufully");
          }
          
          setModal(false);
          setEditable(null);
          
        }catch(error){
         setLoading(false)
         message.error("Failed to add transaction");
        }
    };

    //getall transcation on display
    const [allTransaction,setAllTransaction]=useState([]);
    const [frequency,setFrequency]=useState('7');
    const [type,setType]=useState('all')
    const [viewData,setViewData]=useState('table')


    //useEffect hook 
    useEffect(()=>{
        const getAllTransactions=async()=>{
            try{
              const user=JSON.parse(localStorage.getItem('user'))
              setLoading(true)
              const res=await axios.post('/transactions/get-transaction',{userid:user._id,frequency,type})
              setLoading(false)
              const formattedData = res.data.map(transaction => ({
                ...transaction,
                date: moment(transaction.date).format('DD-MM-YYYY'), // Format the date here
              }));
              setAllTransaction(formattedData)
              
            }catch(error){
               console.log(error)
               message.error("Fetch issue with transaction");
            }
        }
        getAllTransactions();
    },[frequency,type]);
    
    //table
    const columns=[
       {
        title:'Date',
        dataIndex:"date"
       },
       {
        title:'Amount',
        dataIndex:"amount"
       },
       {
        title:'Category',
        dataIndex:"category"
       },
       {
        title:'Type',
        dataIndex:"type"
       },
       {
        title:'Description',
        dataIndex:"description"
       },
       {
        title:'Currency',
        dataIndex:"currency"
       },
       {
        title:'Actions',
        render:(text,record)=>(
            <div>
                <EditFilled onClick={()=>{
                    setEditable(record)
                    setModal(true)
                }}/>
                <DeleteFilled className="mx-2"
                    onClick={()=>handleDelete(record)}
                />
            </div>
        )
       },
    ]

    

    return(
        <>
           <div className="navHeader">
             <div className="logoName"><span className="effect">CashTracker</span></div>
             <div className="rightBox">
                
                <div className="username"><PersonIcon style={{ color: 'white', marginRight: '8px' }}/>{loginUser && loginUser.name}</div>
                <button className="buttondesign"
                onClick={logoutHandler}>LogOut</button>
             </div>
            </div>
            
            {loading && <Spinner/>}
            <div className="filters">
             <div className="leftBox">
                <div className="first">
                <h6>Select Frequency</h6>
                <Select value={frequency} onChange={(values)=>setFrequency(values)} >
                    <Select.Option value="7">Last 1 Week</Select.Option>
                    <Select.Option value="30">Last 1 Month</Select.Option>
                    <Select.Option value="365">Last 1 Year</Select.Option>
                    {/* <Select.Option value="custom">custom</Select.Option> */}
                </Select>
                </div>
                

                <div >
                <h6>Select Type</h6>
                <Select value={type} onChange={(values)=>setType(values)} >
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="income">Income</Select.Option>
                    <Select.Option value="expense">Expense</Select.Option>
                    
                </Select>
                </div>
             </div>
                
                
                <div className="filterRightBox">
                <div className="switch-icons">
                
                <UnorderedListOutlined 
                 className={`mx-2 ${viewData==='table' ? 'active-icon' :'inactive-icon'}`}
                 onClick={()=>setViewData('table')}

                 />
                <AreaChartOutlined  
                className={`mx-2 ${viewData==='analytics' ? 'active-icon' :'inactive-icon'}`}
                onClick={()=>setViewData('analytics')}/>
                
                </div>
                <div className="circleBtn">
                    <button className="addButton"
                     onClick={()=>setModal(true)}>+</button>
                </div>
                </div>
                

            </div>

            <div className="content">
            {viewData==='table' ? 
            <Table 
              columns={columns} 
              dataSource={allTransaction}
                
              />
            : <Analytics allTransaction={allTransaction}/>
            }
                
            </div>

            <Modal title={editable ? 'Edit Transaction' : 'Add Transaction'}
             open={showModal}
             onCancel={()=>setModal(false)} 
             footer={false}
             >
             
             <Form 
             layout="vertical" 
             onFinish={handleSubmit}
             initialValues={editable}
             >
                <Form.Item label="Amount" name="amount">
                    <Input type="text" required="true"/>
                </Form.Item>

                <Form.Item label="Currency" name="currency">
                <Input type="text" required="true"/>    
                </Form.Item>

                <Form.Item label="Type" name="type">
                    <Select>
                        <Select.Option value="income">Income</Select.Option>
                        <Select.Option value="expense">Expense</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Category" name="category">
                    <Select>
                        <Select.Option value="Salary">Salary</Select.Option>
                        <Select.Option value="Incentive">Incentive</Select.Option>
                        <Select.Option value="freelancing">Freelancing</Select.Option>
                        <Select.Option value="medical">Medical</Select.Option>
                        <Select.Option value="movie">Movie</Select.Option>
                        <Select.Option value="food">Food</Select.Option>
                        <Select.Option value="Bills">Bills</Select.Option>
                        <Select.Option value="Tax">Tax</Select.Option>
                        <Select.Option value="fees">Fees</Select.Option>
                        <Select.Option value="misc">Miscellanous</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Date" name="date">
                    <Input type="date"/>
                </Form.Item>

                <Form.Item label="Reference" name="reference">
                    <Input type="text"/>
                </Form.Item>

                <Form.Item label="Description" name="description">
                    <Input type="text"/>
                </Form.Item>

                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
             </Form>
            </Modal>
        </>
            
        
    );
};