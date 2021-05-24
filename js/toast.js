/**
 * removes item from the toast msg.
 * @param {string} data the data-data attribute to match with
 */
export function removeItemToastMsg(data){
  const msgs = document.querySelectorAll(".toast li");
  msgs.forEach((li, index) => {
    if (li.getAttribute("data-data") == data){
      li.remove();
      if (msgs.length == 1) document.querySelector(".toast").remove();
    }
  });
}

/**
 * shows a toast message at the bottom of the screen and disappears after
 * 3 secs. Better than having a div for feedback on every page
 * @param {string} msg message
 * @param {string} data datafield
 * @param {int} type 0 error | 1 good
 */
export function showToastMsg(msg, data, type) {
  let color;
  if (type == 0) color = "red";
  if (type == 1) color = "green";

  const css = "";

  
  let list = [];
  // check if exists
  if (document.querySelector(".toast")) {
    const toast = document.querySelector(".toast");
    list = document.querySelectorAll("li[data-data]");

    // check if already exists data
    let exists = false;
    list.forEach(item => {
      if (item.getAttribute("data-data") == data) {
        exists = true;
      }
    });

    if (!exists) {
      const li = document.createElement("li");
      li.setAttribute("data-data", data);
      li.innerHTML = msg;
      li.style.cssText = `
        list-style: none;
      `;
      toast.appendChild(li);
    }
    document.body.appendChild(toast);
  } else {
    const li = document.createElement("li");
    li.setAttribute("data-data", data);
    li.innerHTML = msg;
    li.style.cssText = `
      list-style: none;
    `;
    list.push(li);

    const toast = document.createElement("ul");
    toast.classList.add("toast");
    toast.style.cssText = `
      box-sizing: border-box;
      position: fixed;
      width: 100%;
      height: auto;
      bottom: 0;
      left:0;
      padding: 20px;
      background-color: ${color};
      color: white;
      text-align: center;
      overflow-wrap: break-word; 
      z-index:100;
    `;

     list.forEach(item => {
       toast.appendChild(item);
     })
    document.body.appendChild(toast);
  }

  
  setTimeout(() => {
    const tst = document.querySelector(".toast");
    if (tst) tst.parentNode.removeChild(tst);
  }, 10000);
}


