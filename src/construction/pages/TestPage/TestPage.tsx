import * as React from 'react';
import { connect, AnyAction } from 'react-redux';
// import * as actions from '../../../storage/actions';
// import { itemActions } from '../../../storage/actions';
import { itemActions } from '../../../storage/actions';

import axios from 'axios';
import './TestPage.css';
// const axioss = require('../../../storage/helpers/axios-wrapper');

export interface ICakeItem { name: string; value: any; }
export interface IOrderItem { id: string, name?: any; value?: any; }
export interface IHelloProps {
    list: Array<ICakeItem>;
    taskFetch: () => Promise<void>;
}

const firebaseAuthUrl = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/';
const appUrl = process.env.REACT_APP_API_URL;
const secKey = 'key=AIzaSyCc1nMVcA85v-uXsDlIhWiUQHGVy2NMzIo';
const user = '123456';
const payload = {
    email: `${user}@ristevski.me`,
    password: user,
    returnSecureToken: true,
};

class TestPage extends React.Component<IHelloProps, any> {
    state = {
        name: "Aleks",
        //list: new Array<CakeItem>(),
        list: new Array<IOrderItem>(),
    }

    componentDidMount() {
        // itemActions.
        this.props.taskFetch();
    }

    clickAuth = () => {
        const url = `${firebaseAuthUrl}signupNewUser?${secKey}`;
        axios
            .post(url, payload)
            .then((res) => {
                console.log(res);
                localStorage.setItem(user, res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    logInAuth = () => {
        const url = `${firebaseAuthUrl}verifyPassword?${secKey}`;
        axios
            .post(url, payload)
            .then((res) => {
                console.log(res);
                localStorage.setItem(user, JSON.stringify(res.data));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    saveOrders = (isRnd) => {
        const token = JSON.parse(localStorage.getItem(user) || '').idToken;
        const rnd = isRnd ? `_${Math.floor(Math.random()*10000)}`:''; 
        const url = `${appUrl}orders/-LUPyjOsKeAUIQ4AuaHi/bulders${rnd}.json?auth=${token}`; 
        const payload = { name:'kobaja', amount: 1};
        const payload2 = { name:'jaja', amount: 2};
        axios
            .post(url, payload2)
            .then((res) => {
                console.log(res);
                localStorage.setItem('orders_response', JSON.stringify(res.data));
            })
            .catch((err) => {
                console.log(err);
            });
    }


    fetchAll = () => {
        const token = JSON.parse(localStorage.getItem(user) || '').idToken;
        const url = `${appUrl}orders/-LUPyjOsKeAUIQ4AuaHi.json?auth=${token}`; 
        axios
            .get(url)
            .then((res) => {

                const data = Object.keys(res.data).map((key)=> {
                    return { ...res.data[key], id: key };
                })

                this.setState({list: data });    
            })
            .catch((err) => {
                console.log(err);
            });
    }
    // const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
    // const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    // const res = yield axios.get('/orders.json' + queryParams);

    public render() {
        return (
            <div>
                <h1>This is Test</h1>
                <button type="button" onClick={this.clickAuth} >Create User</button>
                <button type="button" onClick={this.logInAuth} >Log In</button>
                <button type="button" onClick={this.saveOrders.bind(this, false)} >Save Orders</button>
                <button type="button" onClick={this.saveOrders.bind(this, true)} >Save Random Orders</button>
                <button type="button" onClick={this.fetchAll} >Fetch All</button>
                <ul>
                    {this.props.list.map((item, i) => <li key={i}>{item.name} {item.value}</li>)}
                </ul>
                { this.state.list.map((item, i)=>{
                    return <p key={i}>{item.id}</p>
                })}
            </div>
        );
    }
}


// nipstr.com
// npmjs.com/


// md5 hash
// https://web.archive.org/web/20170425230948/http://www.webreference.com:80/programming/javascript/jkm3/index.html
// http://www.myersdaily.org/joseph/javascript/md5.js
// cryptojs

// my IP 10.75.215.102 and 86.178.64.201
// 185.156.174.166 and 10.8.15.210
//  Screen:
// screenWidth/height: 1920 x 1080
// Window:
// windowWidth/height: 766 x 945
// Browser Language:
// screenPreferred language: English 

// geo locate : https://stackoverflow.com/questions/391979/how-to-get-clients-ip-address-using-javascript
// https://github.com/faisalman/ua-parser-js
// https://github.com/jackspirou/clientjs/blob/master/src/client.js
// http://hasseg.org/blog/post/526/getting-a-list-of-installed-fonts-with-flash-and-javascript/
// https://www.lalit.org/wordpress/wp-content/uploads/2008/05/fontdetect.js?ver=0.3


// const mapDispatchToProps = (dispatch) => {
//     return {
//         loadItems: () => dispatch(actions.itemActions.taskFetch())
//     };
// }

const mapStateToProps = (state) => {
    return {
        list: state.item.tasks,
    }
}

const { taskFetch } = itemActions;
export default connect(mapStateToProps, { taskFetch })(TestPage);
