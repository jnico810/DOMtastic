let MessageStore = require('./message_store');

const Inbox = {
  render: ()=>{
    let ul = document.createElement("ul");
    ul.className = "messages";
    let messages = MessageStore.getInboxMessages();
    messages.forEach((message) => {
      let renderedMessage = this.renderMessage(message);
      ul.appendChild(renderedMessage);
    });
    return ul;
  },

  renderMessage: (message) => {
    let li = document.createElement("li");
    li.className = "message";
    li.innerHTML = "";
    let fromSpan = document.createElement("span");

  }
};

module.exports = Inbox;
