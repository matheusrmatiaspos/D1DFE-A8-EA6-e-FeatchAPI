const CHARACTER_PATH = "https://rickandmortyapi.com/api/character/"

var limit = 0;

const getCardImage = (content)=>{
    return `
        <img src="${content.image}" alt="${content.name}">
    `;
}

const getCharacter = async (num)=>{
    const backBtn = document.getElementsByClassName("nes-btn")[0]
    limit+=num
    if (limit===0 || limit===1){
        backBtn.classList.remove("is-primary")
        backBtn.classList.add("is-disabled")
        backBtn.disabled = true
        limit=1
    }else{
        backBtn.classList.add("is-primary")
        backBtn.classList.remove("is-disabled")
        backBtn.disabled = false
    }
    

    result = await fetch(`${CHARACTER_PATH}/${limit}`)
    const data = await result.json()
    const card = getCardImage(data);

    const characterImg = document.getElementById('character-img')
    characterImg.innerHTML = card

    const characterTitle = document.getElementsByClassName('title')[0]
    characterTitle.textContent = data.name

    const characterSpecie = document.getElementById('character-specie')
    characterSpecie.textContent = `Espécie: ${data.species}`

    const charactersGender = document.getElementById('character-gender')
    charactersGender.textContent = `Gênero: ${data.gender}`

    const characterStatus = document.getElementById('character-status')
    characterStatus.textContent = `Situação: ${data.status}`

    document.title = data.name        

    const characterOrigin = document.getElementById('character-origin')
    if(data.origin.url != ""){
        result = await fetch(`${data.origin.url}`)
        const originData = await result.json()
        characterOrigin.textContent = `Origem: ${originData.type} ${originData.name}`
    }else{
        characterOrigin.textContent = `Origem: unkdown`
    }    
}