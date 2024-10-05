import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default (gameNamespace) => {
  gameNamespace.on('connection', (socket) => {
    console.log('User connected', socket.id);

    socket.on('initial', async (patient) => {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: `Act like a patient giving the doctor a summary in only a few sentences, 
            
            example: Hi, Dr. Shreya. Good to see you.  I've been having a persistent cough lately, and I've noticed I'm losing weight without trying. I'm a bit concerned because I've been a smoker for many years. 
            
            Use this info: history: ${patient.history}, symptoms: ${patient.symptoms}, additional information: ${patient.additionalInfo}.`,
          },
        ],
        model: 'llama3-8b-8192',
      });
      const content = chatCompletion.choices[0]?.message?.content || '';

      socket.emit('message', {
        senderType: 'patient',
        content: content,
      });
      socket.emit('initialResponse');
    });

    socket.on('initial-2', async (patient) => {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: `Act like a senior doctor helping you (player/junior doctor) figure out the correct test without telling the user the test, like a game for the player, in only a few sentences, 
            
            example: The patient is a 60-year-old male with a history of smoking. He presents with a cough and unintentional weight loss. These symptoms warrant further investigation. Let's go to the lab to diagnose further. What test should we run?. 
            
            Use this info: age: ${patient.age} history: ${patient.history}, symptoms: ${patient.symptoms}, additional information: ${patient.additionalInfo}.`,
          },
        ],
        model: 'llama3-8b-8192',
      });
      const content = chatCompletion.choices[0]?.message?.content || '';

      socket.emit('message', {
        senderType: 'aidoctor',
        content: content,
      });
    });

    socket.on('test', async (data) => {
      let patient = data.patient;
      let userMessage = data.message;

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: `Act like a senior doctor helping you (player/junior doctor). The player has said ${userMessage.content}. Tell the player how accurate the test is to the correct test that is ${patient.correctTest}. Give a response in only a maximum of 3 paragraphs
            
            Also give the user points strictly in the form: points:[n/5] where n is how accurate the test was.
            
            example for inaccurate test: I understand your thinking, but a Complete Blood Count (CBC) might not give us the most relevant information for this case.

            example for accurate test: Great choice, Doctor!
            
            Use this info: age: ${patient.age} history: ${patient.history}, symptoms: ${patient.symptoms}, additional information: ${patient.additionalInfo}.
            
            Generate a report based on ${patient.correctTest} and ask the player to then provide a diagnosis
            `,
          },
        ],
        model: 'llama3-8b-8192',
      });
      const content = chatCompletion.choices[0]?.message?.content || '';
      const regex = /(\d+)\/(\d+)/;

      const match = content.match(regex);
      let points = null;
      let totalPoints = null;

      if (match) {
        points = match[1];
        totalPoints = match[2];
      }

      socket.emit('message', {
        senderType: 'aidoctor',
        content: content,
        points,
        totalPoints,
      });
      socket.emit('testComplete', {
        points,
        totalPoints,
      });
    });

    socket.on('diagnosis', async (data) => {
      let patient = data.patient;
      let userMessage = data.message;

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: `Act like a senior doctor helping you (player/junior doctor). The player has said ${userMessage.content}. Tell the player how accurate the diagnosis is to the correct disgnosis that is ${patient.correctDiagnosis}. Give a response in only a maximum of 2 paragraphs
            
            Also give the user points strictly in the form: points:[n/5] where n is how accurate the test was.
            
            Use this info: age: ${patient.age} history: ${patient.history}, symptoms: ${patient.symptoms}, additional information: ${patient.additionalInfo}.`,
          },
        ],
        model: 'llama3-8b-8192',
      });
      const content = chatCompletion.choices[0]?.message?.content || '';
      const regex = /(\d+)\/(\d+)/;

      const match = content.match(regex);
      let points = null;
      let totalPoints = null;

      if (match) {
        points = match[1];
        totalPoints = match[2];
      }

      socket.emit('message', {
        senderType: 'aidoctor',
        content: content,
      });

      socket.emit('diagnosisComplete', {
        points,
        totalPoints,
      });
    });
  });
};
