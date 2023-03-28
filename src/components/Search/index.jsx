import React, { Component } from 'react'

import axios from "axios";
import PubSub from "pubsub-js";
export default class Search extends Component {
    search=()=>{
        // 连续解构赋值
        const {keyWordElement:{value:keyWord}}=this;
        // 发送请求前通知App更新状态
        PubSub.publish("mes",{isFirst:false,isLoading:true});
        axios.get(`/api/search/users?q=${keyWord}`).then(
            response=>{
                // console.log(response.data);
                // 请求成功后通知App更新状态
                PubSub.publish("mes",{isLoading:false,users:response.data.items})
            },
            error=>{
                // console.log(error.message);
                PubSub.publish("mes",{isLoading:false,err:error.message});
            }
        )
    }
    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">Search Github Users</h3>
                <div>
                    <input ref={(c)=>{this.keyWordElement=c;}} type="text" placeholder="enter the name you search"/>&nbsp;
                    <button onClick={this.search}>Search</button>
                </div>
            </section>
        )
    }
}
