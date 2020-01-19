
const comfirm = (msg) => 
    new Promise((resolve, rejected) => {
        let res = window.confirm(msg)
        if (res === true) {
            resolve(true)
        } else {
            resolve(false)
        }
    })

export default comfirm