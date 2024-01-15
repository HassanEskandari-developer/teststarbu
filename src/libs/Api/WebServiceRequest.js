// V 1.0.4

/* eslint-disable */
import axios from "axios";
import Helper from "../Helper";
// import store from "@/store";

class WebServiceRequest {
    static baseUrl = 'https://stoplight.io/mocks/diginext-interview/website-interviews/144194864/';

    constructor(context) {
        this.context = context
        this.data = {
            meta: {},
            request: {}
        };
        let userToken = '';
        // if (Object.keys(this.context.$store.getters.MyBitUser).length > 0) {
        //     userToken = this.context.$store.getters.MyBitUser.user.token;
        // }
        this.userToken = userToken;
        axios.defaults.headers.common['Authorization'] = userToken;
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    }

    getData() {
        return this.data
    }

    setTag(tag) {
        this.tag = tag
    }

    getTag() {
        return this.tag
    }

    setRequestParam(value) {
        // this.queryUrl[key] = value
        this.queryUrl = value;
    }

    convertDataToQueryString() {
        return Object.keys(this.queryUrl).map(key => key + '=' + this.queryUrl[key]).join('&');
    }

    setMetaParam(key, value) {
        this.data.meta[key] = value
    }

    setRequestParamDataObj(value) {
        this.data = value
    }

    setFormData(data) {
        this.formData = data;
    }

    getFormData() {
        return this.formData;
    }

    getUrl() {
        if (this.queryUrl && Object.keys(this.queryUrl).length > 0) {
            let query_string = this.convertDataToQueryString();
            return WebServiceRequest.baseUrl + this.tag + "?" + query_string;
        } else {
            return WebServiceRequest.baseUrl + this.getTag();
        }
    }

    async fetch(successCallback, errorCallback) {
        const _this = this;

        try {
            const _data = await fetch(this.getUrl(), {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                // mode: 'no-cors', // no-cors, *cors, same-origin
                // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                // credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    // 'content-type': 'multipart/form-data;boundary=<calculated when request is sent>',
                    'Access-Control-Allow-Origin': '*',
                    // 'Access-Control-Allow-Origin': 'origin',
                    'Authorization': this.userToken,
                },
                // redirect: 'follow', // manual, *follow, error
                // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(this.getData()) // body data type must match "Content-Type" header
            }).then(function (response) {
                if (response.status === 201) {
                    return successCallback ()
                }
                if (response.status === 401) {

                    // Remove userData from localStorage
                    localStorage.removeItem('userData')

                    // Redirect to login page
                    this.context.$router.push({name: 'auth-login'})
                }
                if (response.status === 500) {
                    this.context.$router.back();
                }
                if (response.status === 400) {
                    // return _this.context.$toast.error("Data is not correct!");
                }
                return response.json()
            })
            if (_data) {
                successCallback(_data)
            } else {
                errorCallback(_data)
            }
        } catch (e) {
            // Helper.closeLoadingOverlay(this.context);
            console.log(e)
        }
    }

    async get(successCallback, errorCallback) {
        const _this = this;

        try {
            const _data = await fetch(this.getUrl(), {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                // mode: 'no-cors', // no-cors, *cors, same-origin
                // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                // credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    // 'content-type': 'multipart/form-data;boundary=<calculated when request is sent>',
                    'Access-Control-Allow-Origin': '*',
                    // 'Access-Control-Allow-Origin': 'origin',
                    'Authorization': this.userToken,
                },
                // redirect: 'follow', // manual, *follow, error
                // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                // body: JSON.stringify(this.getData()) // body data type must match "Content-Type" header
            }).then(function (response) {
                if (response.status === 201) {
                    // return successCallback ()
                }
                if (response.status === 401) {

                    // Remove userData from localStorage
                    // localStorage.removeItem('userData')

                    // Redirect to login page
                    // this.context.$router.push({name: 'auth-login'})
                }
                if (response.status === 500) {
                    this.context.$router.back();
                }
                if (response.status === 400) {
                    // return _this.context.$toast.error("Data is not correct!");
                }
                return response.json()
            })
            if (_data) {
                successCallback(_data)
            } else {
                errorCallback(_data)
            }
        } catch (e) {
            // Helper.closeLoadingOverlay(this.context);
            console.log(e)
        }
    }

    async sendFormData(successCallback, errorCallback) {
        // const _this = this
        try {
            await axios.post(this.getUrl(), this.getFormData(), {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // 'content-type': 'multipart/form-data;boundary=<calculated when request is sent>',
                    // 'Access-Control-Allow-Origin': '*',
                    // 'Access-Control-Allow-Origin': 'origin',
                    'Authorization': this.userToken,
                },
            }).then(function (response) {
                const _data = response
                if (_data) {
                    successCallback(_data)
                } else {
                    // token invalid mode
                    errorCallback(_data)
                }
            })
        } catch (e) {
            console.log('error in WebServiceRequest send function', e)
        }
    }
}

export default WebServiceRequest
