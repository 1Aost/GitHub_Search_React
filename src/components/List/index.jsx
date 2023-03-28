import React, { Component } from 'react'

import PubSub from "pubsub-js";
import "./index.css"
export default class List extends Component {
    // 初始化状态
    state={
        users:[],
        isFirst:true,
        isLoading:false,
        err:"",
    }
    // 页面中挂载完毕
    componentDidMount() {
        this.token=PubSub.subscribe("mes",(_,stateObj)=>{
            this.setState(stateObj);
        })
    }
    // 注销
    componentWillUnmount() {
        PubSub.unsubscribe(this.token);
    }
    render() {
        const {users,isFirst,isLoading,err}=this.state;
        return (
            <div className="row">
                {
                    isFirst? <h2>欢迎搜索</h2>:
                    isLoading? <h2>Loading......</h2>:
                    err? <h2 style={{color:"red"}}>{err}</h2>:
                    users.map((userObj)=>{
                        return (
                            <div key={userObj.id} className="card">
                                <a href={userObj.html_url} rel="noreferrer" target="_blank">
                                    <img alt='head_img' src={userObj.avatar_url} style={{width: '100px'}}/>
                                </a>
                                <p className="card-text">{userObj.login}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
