import { useState, useEffect } from "react"
import "./App.css"
import { pictures } from "./data"

function Images({ api, name, handlePictures }) {
  const [img, setImg] = useState()

  function handleGlow(e, type) {
    type === "enter"
      ? (e.target.style.boxShadow = "0px 0px 15px 2px white")
      : (e.target.style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px")
  }
  useEffect(() => {
    async function getImg() {
      let response = await fetch(`${api}`, { mode: "cors" })
      let data = await response.json()
      setImg(data.image)
    }
    getImg()
  }, [api])
  return (
    <div
      onClick={() => handlePictures(name)}
      style={{ backgroundImage: `url(${img})` }}
      onMouseEnter={(e) => handleGlow(e, "enter")}
      onMouseLeave={(e) => handleGlow(e)}
    >
      {name}
    </div>
  )
}

function MemoryCards() {
  const [record, setRecord] = useState(0)
  const [score, setScore] = useState(0)
  const [currentPictures, setCurrentPictures] = useState(["hello"])

  function handlePictures(id) {
    if (currentPictures.includes(id)) {
      setScore(0)
      setCurrentPictures("")
      if (score > record) {
        setRecord(score)
      }
    } else {
      setScore(score + 1)
      setCurrentPictures([...currentPictures, id])
    }
  }
  let randomPictures = randomize(pictures)
  return (
    <>
      <div className="header">
        <p>Star Wars Memory Cards</p>
        <div>
          <div> Score: {score}</div>
          <div> High Score: {record}</div>
        </div>
      </div>
      <div className="pictures">
        {randomPictures.map((element) => {
          return (
            <Images
              handlePictures={handlePictures}
              name={element.name}
              key={element.name}
              api={element.api}
            />
          )
        })}
      </div>
    </>
  )
}

function randomize(array) {
  let result = array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
  return result
}

export { MemoryCards }
