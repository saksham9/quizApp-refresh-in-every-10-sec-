
  function Question(_text,_options,_ans){
    let text=_text;
    let options=_options;
    let ans=_ans;
    Object.defineProperties(this,{
      text:{
        get:function(){
          return text;
        }
      },
      options:{
        get:function(){
          return options;
        }
      },
      ans:{
        get:function(){
          return ans;
        }
      }
    });
  }

  let questions = [new Question("Who scored the highest run in ODI?",["a.Sachin Tendulkar","b.Ricky Ponting","c.Brian Lara","d.Don Bradman"],1),
                  new Question("Who scored the highest run in Test?", ["a.Virat Kohli","b.Ricky Ponting","c.Brian Lara","d.Sachin Tendulkar"],4),
                  new Question("What does LBW stands for?",["a.Long Ball Wide","b.Leg Beyond Width","c.Leg Before Wicket","d.lol'bout To Win"],3),
                  new Question("Who did England beat in the final of the 2019 Cricket World Cup?",["a.New Zealand", "b.India", "c.Australia", "d.Belarus"],1)
                ];
  
  /*
  <div class="card">
            <div class="imgbx" data-text="Que1">
              <img src="images/man.svg" alt="" />
            </div>
            <div class="content">
              <div>
                <h3>Q1</h3>
                <p>1.Who scored the highest run in ODI?</p>
                <div class="options">
                  <button class="right">a.Sachin Tendulkar</button>
                  <button class="wrong">b.Ricky Ponting</button>
                  <button class="wrong">c.Brian Lara</button>
                  <button class="wrong">d.Don Bradman</button>
                </div>
              </div>
            </div>
          </div>
  */
 let ans_list = [];
 let i=0;
 const start=()=>{
    const ins=document.getElementById("instruction");
    //ins.classList.add("hide");
    ins.remove();
    const scoreBoard=document.getElementById("scoreTimer");
    scoreBoard.style.display="";
    generate_que();
    const timer=document.getElementById("timer");
    timer.innerHTML=10;
    let j=0;
    const timer_id=setInterval(()=>{
      timer.innerHTML=10-(++j);
      if(j===9){
        clearInterval(timer_id);
      }
    },1000);
    i++;
    let id=setInterval(()=>{ 
        let j=0;
        generate_que();
        const timer=document.getElementById("timer");
        timer.innerHTML=10;
        const timer_id=setInterval(()=>{
          timer.innerHTML=10-(++j);
          if(j===9){
            clearInterval(timer_id);
          }
        },1000);
        i++;
        if(i>3){
            setTimeout(()=>{
                clearInterval(id);
                finalsubmit();
            },9000);  
        }
    },10000);

 }
 const generate_que=()=>{
    console.log(i);
    let container = document.getElementById("cont");
    container.style.display="";
    if(i>0){
        console.log(String(i-1));
        let remove_card=document.getElementById(String(i-1));
        remove_card.remove();
    }
    
    let question = questions[i];
    //console.log(question);
    
    let card = document.createElement("div");
    card.className = "card";
    card.id=String(i);
    let content = document.createElement("div");
    content.className = "content";
    let head = document.createElement("h3");
    head.innerHTML = ["Q1", "Q2", "Q3", "Q4"][i];
    let p = document.createElement("p");
    let tempid=["q1","q2","q3","q4"][i];
    p.id=tempid+"-text";
    p.innerHTML = question.text;
    let options_div = document.createElement("div");
    options_div.className = "options";
    for (let j = 0; j < question.options.length; j++) {
        let but = document.createElement("button");
        but.id=String(j+1)+tempid;
        but.addEventListener("click",submit);
        but.className = `${question.ans === j ? "right" : "wrong"}`;
        but.innerHTML = question.options[j];
        options_div.appendChild(but);
    }
    content.appendChild(head);
    content.appendChild(p);
    content.appendChild(options_div);
    card.appendChild(content);
    container.appendChild(card);
    //console.log(card);
}



const submit = (event) => {
  const el2=event.target;
  const el1=el2.id.slice(1);
  //console.log(el2);
  //console.log(el1);
  const div = document.getElementById(el1);
  
  for (let i = 1; i <= 4; i++) {
    const id = String(i) + el1;
    const bttn = document.getElementById(id);
    if (parseInt(el2.id.charAt(0)) == i) {
      bttn.classList.add("bttn-change");
      //console.log(ans);
    } else {
      bttn.classList.remove("bttn-change");
    }
  }
  const text = document.getElementById(el1 + "-text");
  const ans = { id: el2.id, que: text.textContent };
  if (ans_list.length == 0) {
    ans_list.push(ans);
  } else {
    let find = false;
    let remove_index = -1;
    for (let i = 0; i < ans_list.length; i++) {
      if (ans_list[i].que == text.textContent) {
        find = true;
        remove_index = i;
      }
    }
    if (find) {
      ans_list.splice(remove_index, 1);
    }
    ans_list.push(ans);
  }
  //console.log(ans_list);
};
const finalsubmit = () => {
  let score = 0;
  console.log(ans_list);
  for (let i = 0; i < ans_list.length; i++) {
    if (
      questions.some(
        (a) =>
          a.text === ans_list[i].que &&
          a.ans === parseInt(ans_list[i].id.charAt(0))
      )
    ) {
      score += 10;
    } else if (
      questions.some(
        (a) =>
          a.text === ans_list[i].que &&
          a.ans !== parseInt(ans_list[i].id.charAt(0))
      )
    ) {
      score -= 2.5;
    }
  }
  const scoreset = document.getElementById("score");
  scoreset.innerHTML = score + "/40";
  document.getElementById("popup-1").classList.toggle("active");
  if (score > 20) {
    fire();
    console.log("sbdh");
  }
  console.log(score);
};

const fire = () => {
  const content = document.getElementById("firework-content");
  for (let i = 1; i < 4; i++) {
    const firework = document.createElement("div");
    firework.classList.add("firework");
    firework.id = ["firework1", "firework2", "firework3"][i];
    for (let i = 1; i < 13; i++) {
      const explosion = document.createElement("div");
      explosion.classList.add("explosion");
      firework.appendChild(explosion);
    }
    content.appendChild(firework);
  }
  console.log(content);
};
  