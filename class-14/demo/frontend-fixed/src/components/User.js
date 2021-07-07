import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import Cat from './Cat';
import axios from 'axios';

export class User extends Component {
    constructor(){
        super();
        this.state={
            catName:'',
            catsList:[],
            showUpdateForm:false,
            showCreateForm:true,          
        }
    }
    componentDidMount=()=>{
        if(this.props.auth0.isAuthenticated){
            console.log(this.props.auth0.user.email);
            // v.salvatore7@gs.gmail.com
            let url=`${process.env.REACT_APP_SERVER_URL}/cats?email=v.salvatore7@gs.gmail.com`
            axios.get(url).then(res=>{
                this.setState({
                   catsList:res.data
                })
                console.log(res.data.cats)
            })
        }
    }
    getInput=(e)=>{
        this.setState({
            catName:e.target.value
        })
    }
    showUpdateForm=()=>{
        this.setState({
            showUpdateForm:true,            
        })
    }
    createCat = (e) => {
        e.preventDefault()
        // we are going to create a request body object, which will contain the email and the cat name to be sent over to the backend server
        const reqBody = {
            catName: this.state.catName,
            userEmail: 'v.salvatore7@gs.gmail.com'
            // username:'',
            // email:'',
            // passowrd:''
        }
        // const config={
        //     'Authorization':
        // }
        // to send a request for creating new data, we will be using the POST method
        axios.post(`${process.env.REACT_APP_SERVER_URL}/create-cat`, reqBody).then(response => {
            this.setState({
               catsList:response.data.cats
            })
        }).catch(error =>
            alert(error.message)
        )
    }

    // getUpdatedCatName=(e)=>{
    //     this.setState({
    //         catName:e.target.event
    //     })
    //     console.log(this.state.catName)
    // }
    getUpdatedCatName=(e)=>{
        this.setState({
            catName:e.target.value
        });

    }
    updateCatName=(e,cat_idx)=>{
        e.preventDefault();

        const reqBody={
            userEmail:'v.salvatore7@gs.gmail.com',
            catName:this.state.catName
        }
      
        axios.put(`${process.env.REACT_APP_SERVER_URL}/update-cat/${cat_idx}`,reqBody).then(res=>{
            this.setState({
                catsList:res.data
            });
        }
        )
    }
    // v.salvatore7@gs.gmail.com
    deleteCat=(cat_idx)=>{

        let url=`${process.env.REACT_APP_SERVER_URL}/delete-cat/${cat_idx}/?email=v.salvatore7@gs.gmail.com`
        axios.delete(url).then(res=>{
            this.setState({
                catsList:res.data
            })
        })
    }
    render() {
        return (
            <div>
                <h1>{this.props.auth0.user.name}</h1>
                <img src={this.props.auth0.user.picture} alt={this.props.auth0.user.email}/>
                <h3>{this.props.auth0.user.email}</h3>
                {  this.state.showCreateForm&&<form>
                                                <input type="text" onChange={(e)=>{this.getInput(e)}}/>
                                                <button onClick={(e)=>{this.createCat(e)}}>creat cats</button>
                                                </form>
                }
                <br/>

                {
                    this.state.catsList.map((cat,index)=>{
                        // let cat_idx=index
                        return <>
                        <form>
                            <input type="text" placeholder={cat.name} onChange={e=>this.getUpdatedCatName(e)}/>
                            <button id={index}onClick={(e)=>this.updateCatName(e,index)}>update {cat.name}</button>
                        </form>
                        <button onClick={(e)=>this.deleteCat(index)}>delete cat</button>
                        <Cat catname={cat.name} key={index}/>
                        
                        </>
                        
                    })
                }
                
            </div>
        )
    }
}

export default withAuth0(User)
