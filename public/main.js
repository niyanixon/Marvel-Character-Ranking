const thumbUp = document.getElementsByClassName('fa-heart')
const trash = document.getElementsByClassName('fa-trash')
const thumbsDown = document.getElementsByClassName('fa-thumbs-down')
const switchButton = document.querySelector('.checkbox').addEventListener('click', switchColor)

function switchColor() {
  const checkBox = document.querySelector('.checkbox');
  
  if (checkBox) {
    // Check if the checkbox is checked
    if (checkBox.checked) {
      document.querySelector('body').style.background = "#FF2929"; // Apply color when checked
    } else {
      document.querySelector('body').style.background = "grey"; // Reset color when unchecked
    }
  }
}


Array.from(thumbUp).forEach(element => {
    element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const govName = this.parentNode.parentNode.childNodes[3].innerText
        const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('characters', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'name': name,
              'govName': govName,
              'thumbUp':thumbUp
            })
          })
          .then(response => {
            if (response.ok) return response.json()
          })
          .then(data => {
            console.log(data)
            window.location.reload(true)
          })
    })
})
Array.from(trash).forEach(function(element) {
    element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const govName = this.parentNode.parentNode.childNodes[3].innerText
      fetch('characters', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'name': name,
          'govName': govName
        })
      }).then(function (response) {
        window.location.reload()
      })
    });
});

Array.from(thumbsDown).forEach(element => {
  element.addEventListener('click', function(){
      const name = this.parentNode.parentNode.childNodes[1].innerText
      const govName = this.parentNode.parentNode.childNodes[3].innerText
      const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
      fetch('removeLike', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'govName': govName,
            'thumbUp':thumbUp
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
  })
})