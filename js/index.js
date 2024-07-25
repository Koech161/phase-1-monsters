document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('create-monster')
    const form = document.createElement('form')
    formContainer.append(form)

    const nameLabel = document.createElement('label')
    nameLabel.textContent = 'Name:'
    const nameInput = document.createElement('input')
    nameInput.setAttribute('type', 'text')
    nameInput.setAttribute('name', 'name')
    nameLabel.appendChild(nameInput)

    const ageLabel = document.createElement('label')
    ageLabel.textContent = 'Age:'
    const ageInput = document.createElement('input')
    ageInput.setAttribute('type', 'number')
    ageInput.setAttribute('name', 'age')
    ageLabel.appendChild(ageInput)

    const biolabel = document.createElement('label')
    biolabel.textContent = 'Description:'
    const bioInput = document.createElement('textarea')
    bioInput.setAttribute('rows', '4')
    bioInput.setAttribute('name', 'description')
    biolabel.appendChild(bioInput)

    const submitBtn = document.createElement('button')
    submitBtn.setAttribute('type', 'submit')
    submitBtn.textContent = 'Create Monster'



    form.appendChild(nameLabel)
    form.appendChild(document.createElement('br'))
    form.appendChild(ageLabel)
    form.appendChild(document.createElement('br'))
    form.appendChild(biolabel)
    form.appendChild(document.createElement('br'))
    form.appendChild(submitBtn)

    let currentPage = 1


        //FORM
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        if(nameInput.value==='' || ageInput.value==='' || bioInput.value===''){
            alert('input all field')
            return;

        }
        const formData = {
            name: nameInput.value,
            age: parseInt(ageInput.value),
            description: bioInput.value
        }
        

        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(res => res.json())
            .then(data => {
                console.log('succes:', data);
                fetchMonsters(currentPage)
                form.reset()
            }).catch(error => {
                console.error('error fetching monster', error);
            })
    })
    //Fetch data from json
   

function fetchMonsters(page=20, limit=50){
    fetch(`http://localhost:3000/monsters?_page=${page}&_limit=${limit}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const container = document.getElementById('monster-container')
            container.innerHTML=''
            data.forEach(monster => {
                
                
                const monsterCard = document.createElement('div')
                container.appendChild(monsterCard)
                monsterCard.innerHTML = `<h2>${monster.name}</h2>
                                            <h3>${monster.age}</h3>
                                                <p>${monster.description}</p>`
            })
        }).catch(error => {
            console.error('Error fetching monster', error);
        })
    }   fetchMonsters()


    
    

const backBtn=document.getElementById('back')
    const forwadBtn=document.getElementById('forward')
    
    backBtn.addEventListener('click', ()=>{
        if(currentPage>1){ 
            currentPage --
            fetchMonsters()
        }else{
            alert('Ain\'t no monsters here')
        }
       
        
    })
    forwadBtn.addEventListener('click', ()=>{
        currentPage++
        fetchMonsters()
    })
    //init()
})