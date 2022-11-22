import inquirer from 'inquirer'
import fs from 'fs'
import util from 'util'
import path from 'path'

const writeFileAsync = util.promisify(fs.writeFile)

const questions = [
  {
    type: "input",
    name: "company",
    message: "What is the name of the company?"
  },
  {
    type: "input",
    name: "title",
    message: "What is the name of the position?"
  },
]

const prompt = () => {
  return inquirer.prompt([...questions])
}

const generateCL = (answers) => {
  return (
    `Dear Hiring Manager,

I am writing to express interest in the ${answers.title} position with ${answers.company}. I graduated from UNC Chapel Hill’s Full Stack Development bootcamp in October of 2020 and I have a strong desire to use my Psychology background and problem solving skills to tackle relevant web development challenges.

The main reason I chose Full Stack Development was the opportunity to creatively problem solve with innovative ideas. I am a unique thinker and I love tackling challenging problems. I want to apply my Psychology background to address higher-level web development challenges and put forth creative solutions. I am drawn to Full Stack Development for the opportunity to leverage my analytical skills and creativity to help businesses identify and resolve key pain points.

As a self-taught programmer, I am quick to adjust to whatever language or technology I need to learn. In addition to completing my coursework for UNC Chapel Hill, I have also taught myself Python and Switch and refactored one of my assignments using Swift to further my master of the language. I am someone who is very driven. My experience as a lead bartender prior to Covid-19 has made me calm under pressure, and very efficient at managing team members or meeting goals from my own management through effective communication. These skills have come in handy across the several group projects I led during my bootcamp, as well as the in my years of experience as an engineer in previous roles.

I thrive on new challenges and am hopeful to share my experience and energy with ${answers.company}. Given my knowledge of Full Stack Development and my desire to learn, I am confident I can be an asset to your team. I would welcome the opportunity to speak with you, and can be reached at (443) 616-5489 or at jamesspericles@gmail.com.

Thank you for your time and consideration,

James S. Pericles II`
  )
}

const OUTPUT_DIR = path.resolve('output')
const outputPath = path.join(OUTPUT_DIR, "coverLetter.md");

const init = async () => {
  try {
    const answers = await prompt()

    const coverLetter = generateCL(answers)

    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR)
    }

    await writeFileAsync(outputPath, coverLetter)

    console.log('Successfully generated Cover Letter')
  } catch (err) {
    console.log(err)
  }
}

init()