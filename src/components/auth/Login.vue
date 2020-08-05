<template>
    <div>
        <div class="logo">
            <img src="../../assets/images/logoNew.png" alt="">
        </div>
        <div class="login-wrapper">
            <div class="login slide-in-elliptic-top-fwd">
                <div class="">
                    <sui-form class="form">
                        <div class="welcome focus-in-contract-bck">
                            <h1>SMA</h1>
                        </div>
                        <sui-form-field>
                            <label><p class="label">用户</p></label>
                            <label class="input">
                                <input v-model="username" placeholder="请输入用户名" type="text" required/>
                            </label>
                        </sui-form-field>
                        <sui-form-field>
                            <label><p class="label">密码</p></label>
                            <label class="input">
                                <input v-model="password" placeholder="请输入密码" type="password" required/>
                            </label>
                        </sui-form-field>
                        <sui-form-field style="color: white">
                            <sui-checkbox label="7日免登陆" v-model="noResign" />
                        </sui-form-field>
                        <div is="sui-button-group" class="submit">
                            <sui-button color="red" @click.prevent="login">登陆系统</sui-button>
                            <sui-button-or />
                            <sui-button @click.prevent="reset">修改密码</sui-button>
                        </div>
                    </sui-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {login} from "../../api/login"

    export default {
        name: "Login",
        data(){
            return {
                username: '',
                password: '',
                noResign: false
            }
        },
        methods:{
            login(){
                login(this)
            },
            reset(){
                this.$router.push({name: 'reset'})
            }
        }
    }
</script>

<style lang="less">
@import "../../assets/style/login";
</style>