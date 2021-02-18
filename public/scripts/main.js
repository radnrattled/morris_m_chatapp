import ChatMessage from "./components/TheMessageComponent.js";

(() => {

    console.log('fired');

    const socket = io();

    function setUserId({sID, message}) {
           

            vm.socketID = sID;
    }

    function appendMessage(message) {
      
        vm.messages.push(message);
    }

    const vm = new Vue({
        data: {
            messages: [],
            nickname: "",
            username: "",
            socketID: "",
            message: ""
        },
        created: function() {
            console.log('its alive!');
        },

        methods: {
            dispatchMessage(){
                socket.emit('chatmessage', {content: this.message, name: this.nickname || 'Secret Hooter'})
            this.message = "";
            }
        },

        components: {
            newmessage: ChatMessage
        }
    }).$mount("#app");
    socket.addEventListener("connected", setUserId);
    socket.addEventListener('message', appendMessage);
})();