import axios from "axios";
export default {

    isAuth: false,
    token: '',
    idUser: '',
    authenticate(user, pwd) {

        const queryparam = {
            method: "post",
            url: "https://0002-zebridge-dev-externe.api.crm-simple.com/authentification",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                identifiant: user,
                motdepasse: pwd,
            }),
        };
        const vm = this;
        return axios(queryparam)
            .then(function(response) {
                vm.isAuth = true;
                // console.log("RESPONSE BEFORE TOKEN : ", response);
                vm.token = response.data.token;
                vm.idUser = response.data.id;
                return response.data;
            })
            .catch(function(error) {
                console.log(error);
            });


    },

    getToken(user = "admin", pwd = "Dw3BwezaQSar") {
        return this.authenticate(user, pwd);
    }

};