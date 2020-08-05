<template>
    <div class="login">
        <div class="slide-in-elliptic-top-fwd">
            <sui-form class="form">
                <div class="welcome focus-in-contract-bck">
                    <h3>NOMURA SMA</h3>
                </div>
                <sui-form-field>
                    <label>用户</label>
                    <label class="input">
                        <input v-model="username" placeholder="请输入用户名" type="text" required/>
                    </label>
                </sui-form-field>
                <sui-form-field>
                    <label>密码</label>
                    <label class="input">
                        <input v-model="password" placeholder="请输入密码" type="password" required/>
                    </label>
                </sui-form-field>
                <sui-form-field>
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

<style scoped lang="less">
@import "../../assets/style/login";
</style>