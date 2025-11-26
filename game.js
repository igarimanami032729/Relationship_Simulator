// 게임 변수
let playerName = "";
let currentScene = 0;
let affection = {
  노아: 0,
  밤비: 0,
  예준: 0,
  은호: 0,
  하민: 0,
};

// 현재 적용된 배경 이미지 경로 (빈 문자열이면 기본 배경)
let currentBackground = "";

// 타이핑 효과 변수
let isTyping = false;
let typingInterval = null;

// 스토리 데이터
const story = [
  {
    type: "narration",
    speaker: "여주",
    text: "여기가 바로… 내가 다닐 새로운 학교…?",
    thought: true,
  },
  {
    type: "narration",
    id: "hall_bump",
    text: "<br><div class='exclaim'>아얏!!</div>",
    effect: "vpunch",
  },
  {
    type: "dialogue",
    speaker: "노아",
    text: "아, 미안해! 괜찮아? 다치진 않았지? 아… 내가 앞을 잘 못 봤네.",
    image: 1,
  },
  {
    type: "choice",
    question: "",
    choices: [
      { text: "괜찮아요! 저는 안 다쳤어요 ㅎㅎ", next: "normal" },
      { text: "앞 좀 보고 다니세요.", next: "gameover" },
    ],
  },
  {
    type: "gameover",
    id: "gameover",
    speaker: "노아",
    text: "아… 미안… (속마음: 무섭다… 도망가자…)",
    gameOverText: "노아가 당신을 피해 도망갔습니다...",
    image: 1,
  },
  {
    type: "dialogue",
    id: "normal",
    speaker: "노아",
    text: "다행이다. 처음 보는 얼굴인데… 전학생인가? 나는 노아, 3학년이야.",
    image: 4,
  },
  {
    type: "dialogue",
    speaker: "여주",
    text: `저는 {playerName}(이)에요. 오늘 전학 왔어요.`,
  },
  {
    type: "dialogue",
    speaker: "노아",
    text: `{playerName}… 예쁜 이름이네. 혹시 음악 좋아해? 우리 학교 밴드부가 꽤 유명하거든.`,
    image: 3,
    affection: { 노아: 1 },
  },
  {
    type: "narration",
    text: "(이때 뒤에서 누군가 다가온다.)",
  },
  {
    type: "dialogue",
    speaker: "밤비",
    text: "선배. 연습 늦어요.",
    image: 1,
  },
  {
    type: "dialogue",
    speaker: "밤비",
    text: "…누구예요?",
    image: 1,
  },
  {
    type: "dialogue",
    speaker: "노아",
    text: `전학생. {playerName}(이)야.`,
    image: 4,
  },
  {
    type: "dialogue",
    speaker: "밤비",
    text: "…전학생이면 됐고요. 선배, 가요.",
    image: 1,
  },
  {
    type: "choice",
    question: "",
    choices: [
      {
        text: `안녕하세요! 저는 {playerName}(이)에요!`,
        next: "bambi1",
        affection: { 밤비: 1 },
      },
      {
        text: "처음부터 무례하시네요? 인사는 받으시죠?",
        next: "bambi2",
        affection: { 밤비: 1.5 },
      },
      {
        text: "(조용히 웃으며 가볍게 인사만 한다)",
        next: "bambi3",
        affection: { 밤비: 0.5 },
      },
    ],
  },
  {
    type: "dialogue",
    id: "bambi1",
    speaker: "밤비",
    text: "…(잠깐 멈칫) …2학년 밤비. 기타.",
    emotion: "(귀끝이 살짝 빨개진다)",
    image: 2,
  },
  {
    type: "goto",
    next: "invite",
  },
  {
    type: "dialogue",
    id: "bambi2",
    speaker: "밤비",
    text: "…뭐?",
    emotion: "(표정은 화난 듯하지만 은근히 당황)",
    image: 3,
  },
  {
    type: "goto",
    next: "invite",
  },
  {
    type: "dialogue",
    id: "bambi3",
    speaker: "밤비",
    text: "…",
    emotion: "(같이 고개를 숙인다)",
    image: 1,
  },
  {
    type: "dialogue",
    id: "invite",
    speaker: "노아",
    text: `{playerName}, 음악 좋아하면 오늘 연습 구경 올래?`,
    image: 4,
  },
  {
    type: "choice",
    question: "",
    choices: [
      { text: "가보고 싶어요!", next: "bandroom" },
      { text: "오늘은 좀… 죄송해요.", next: "gameover" },
    ],
  },
  {
    type: "narration",
    id: "bandroom",
    text: "(연습실 문이 열리고, 악기들이 세팅된 장면이 보인다)",
  },
  {
    type: "dialogue",
    speaker: "예준",
    text: "응? 새로운 얼굴이네. 혹시 신입?",
    image: 1,
  },
  {
    type: "dialogue",
    speaker: "노아",
    text: `전학생 {playerName}(이)야. 여긴 나랑 같은 3학년 남예준. 보컬 담당이야.`,
    image: 4,
  },
  {
    type: "dialogue",
    speaker: "여주",
    text: "안녕하세요!",
  },
  {
    type: "dialogue",
    speaker: "은호",
    text: "와~~ 전학생!!! 선배들, 새 멤버인가요??",
    emotion: "(강아지..?)",
    image: 1,
  },
  {
    type: "dialogue",
    speaker: "하민",
    text: "안녕하세요. 1학년 하민입니다.",
    emotion: "(말투는 차분한데 눈은 반짝거리네..)",
    image: 1,
  },
  {
    type: "narration",
    speaker: "밤비",
    text: "(기타를 조율하는 척하며 은근히 여주를 살핀다)",
    image: 2,
  },
  {
    type: "dialogue",
    speaker: "예준",
    text: "그럼 오늘은 신곡 먼저 맞춰볼까? 노아, 시작!",
    image: 1,
  },
  {
    type: "dialogue",
    speaker: "노아",
    text: "응.",
    video: "band_performance",
    image: 4,
  },
  {
    type: "video",
    id: "band_performance",
    videoUrl: "../video/mv.mp4",
  },
  {
    type: "dialogue",
    speaker: "여주",
    text: "와… 진짜 잘한다…",
    thought: true,
  },
  {
    type: "dialogue",
    speaker: "밤비",
    text: "왜 멍하니 있어. 시끄러워?",
    image: 1,
  },
  {
    type: "dialogue",
    speaker: "여주",
    text: "아, 아니! 너무 잘해서…",
  },
  {
    type: "dialogue",
    speaker: "밤비",
    text: "…흠.",
    emotion: "(말은 까칠, 얼굴은 아주 살짝 빨개짐)",
    image: 4,
  },
  {
    type: "dialogue",
    speaker: "예준",
    text: `{playerName}, 음악 좋아하는 것 같은데… 혹시 작업해본 거 있니?`,
    image: 1,
  },
  {
    type: "dialogue",
    speaker: "노아",
    text: "작사·작곡도 한다고 하더라.",
    image: 4,
  },
  {
    type: "dialogue",
    speaker: "예준",
    text: "오—? 혹시 가사 몇 줄 보여줄 수 있어?",
    image: 1,
  },
  {
    type: "choice",
    question: "",
    choices: [
      {
        text: "감성적인 사랑 가사",
        next: "lyrics1",
        affection: { 노아: 1, 밤비: 1 },
      },
      {
        text: "밴드부 응원하는 밝은 가사",
        next: "lyrics2",
        affection: { 예준: 1, 은호: 1, 밤비: 0.5 },
      },
      {
        text: "초현실·난해 가사(개그)",
        next: "lyrics3",
        affection: { 밤비: 2, 노아: 1 },
      },
    ],
  },
  {
    type: "dialogue",
    id: "lyrics1",
    speaker: "노아",
    text: `따뜻하네. {playerName}다운 느낌.`,
    image: 3,
  },
  {
    type: "dialogue",
    speaker: "밤비",
    text: "…흠. 뭐… 괜찮네.",
    image: 4,
  },
  {
    type: "goto",
    next: "invite_join",
  },
  {
    type: "dialogue",
    id: "lyrics2",
    speaker: "예준",
    text: "와, 이거 무대에서 부르면 분위기 확 올라가겠다.",
    image: 2,
  },
  {
    type: "dialogue",
    speaker: "은호",
    text: "대박!! 이런 가사 너무 좋아요!!",
    image: 2,
  },
  {
    type: "dialogue",
    speaker: "밤비",
    text: "…(고개 살짝 끄덕)",
    image: 2,
  },
  {
    type: "goto",
    next: "invite_join",
  },
  {
    type: "dialogue",
    id: "lyrics3",
    speaker: "밤비",
    text: "…푸흣. 뭐야 그거.",
    image: 4,
  },
  {
    type: "dialogue",
    speaker: "노아",
    text: `의외로 센스 있네, {playerName}.`,
    image: 3,
  },
  {
    type: "dialogue",
    id: "invite_join",
    speaker: "예준",
    text: `{playerName} 우리 밴드부에 들어오지 않을래? 작사·작곡 담당으로.`,
    image: 2,
    affection: { 예준: 1 },
  },
  {
    type: "dialogue",
    speaker: "여주",
    text: "제가… 들어가도 될까요?",
  },
  {
    type: "dialogue",
    speaker: "노아",
    text: `물론이지. {playerName}정도 실력이면, 오히려 우리에게 과분한걸.?`,
    image: 4,
  },
  {
    type: "dialogue",
    speaker: "밤비",
    text: "…들어오든 말든.",
    image: 1,
  },
  {
    type: "dialogue",
    speaker: "하민",
    text: `{playerName} 선배 들어오면 연습 더 재밌어질 것 같아요.`,
    image: 2,
    affection: { 하민: 1 },
  },
  {
    type: "dialogue",
    speaker: "은호",
    text: "맞아요 맞아요!!",
    image: 2,
  },
  {
    type: "narration",
    text: "(모두가 나간 후, 여주가 떨어뜨린 노트를 밤비가 주워준다.)",
    speaker: "밤비",
    image: 1,
  },
  {
    type: "dialogue",
    speaker: "밤비",
    text: "이거. 떨어뜨렸어.",
    image: 1,
  },
  {
    type: "dialogue",
    speaker: "여주",
    text: "아… 고마워.",
  },
  {
    type: "dialogue",
    speaker: "밤비",
    text: "근데 너… 음악 가볍게 생각하는 건 아니지?",
    image: 1,
  },
  {
    type: "dialogue",
    speaker: "여주",
    text: "응…? 그런 건 아닌데…",
  },
  {
    type: "dialogue",
    speaker: "밤비",
    text: "작사는 예쁜 말만 줄줄 쓰면 다가 아니야. 진짜 마음이 없으면… 노래는 다 티 나.",
    image: 1,
  },
  {
    type: "dialogue",
    speaker: "여주",
    text: "…나름 진심으로 쓴 거였어.",
  },
  {
    type: "dialogue",
    speaker: "밤비",
    text: "…그럼 됐고.",
    emotion: "귀끝 빨개짐",
    image: 2,
  },
  {
    type: "dialogue",
    speaker: "밤비",
    text: "잘해봐. 기대는… 해볼게.",
    image: 4,
  },
  {
    type: "narration",
    text: "밤비가 먼저 나간다.",
  },
  {
    type: "dialogue",
    speaker: "노아",
    id: "bandclub_after",
    text: `{playerName}! 아직 안 갔구나. 집 가는 길… 같이 갈래?`,
    image: 2,
    affection: { 노아: 1 },
  },
  {
    type: "ending",
    text: `밴드부에 정식으로 들어가며, {playerName}의 가슴은 두근거리기 시작했다.
    이제, 그녀의 새로운 학교생활이…?`,
    subtitle: "To be continue...",
  },
];

// 게임 시작
function startGame() {
  const input = document.getElementById("nicknameInput");
  if (input.value.trim() === "") {
    alert("이름을 입력해주세요!");
    return;
  }
  playerName = input.value.trim();

  // 스토리에 플레이어 이름 적용
  for (let scene of story) {
    if (scene.text) {
      scene.text = scene.text.replace(/\{playerName\}/g, playerName);
    }
    if (scene.choices) {
      scene.choices.forEach((choice) => {
        choice.text = choice.text.replace(/\{playerName\}/g, playerName);
      });
    }
  }

  document.getElementById("startScreen").classList.add("hidden");
  showScene(0);

  // 배경음악 자동재생 및 반복 설정
  const bgm = document.getElementById("bgm");
  if (bgm) {
    try {
      bgm.loop = true;
      bgm.preload = "auto";
      // 기본 볼륨(원하면 조정 가능)
      if (typeof bgm.volume === "number") bgm.volume = 0.45;
      const p = bgm.play();
      if (p && p.catch) {
        p.catch((err) => {
          // 일부 브라우저는 사용자 제스처가 필요할 수 있으므로 재생 실패를 무시
          console.warn("BGM 재생 실패:", err);
        });
      }
    } catch (e) {
      console.warn("BGM 설정 중 오류:", e);
    }
  }
}

// 씬 표시
function showScene(index) {
  if (index >= story.length) {
    return;
  }

  currentScene = index;
  const scene = story[index];

  if (scene.id === "bandroom") {
    currentBackground = "images/bandclub.jpg"; // 2번 배경
  }

  if (scene.id === "bandclub_after") {
    currentBackground = "images/background3.jpg"; // 3번 배경
  }

  // 현재 배경 적용
  const charDisplayEl = document.querySelector(".character-display");
  if (charDisplayEl) {
    if (currentBackground) {
      charDisplayEl.style.backgroundImage = `url('${currentBackground}')`;
      charDisplayEl.style.backgroundSize = "cover";
      charDisplayEl.style.backgroundRepeat = "no-repeat";
      charDisplayEl.style.backgroundPosition = "center";
    } else {
      charDisplayEl.style.backgroundImage = "";
    }
  }

  // 씬 이펙트 처리
  if (scene.effect === "vpunch") {
    const container = document.querySelector(".game-screen");
    if (container) {
      container.classList.remove("vpunch");
      container.offsetWidth;
      container.classList.add("vpunch");
      container.addEventListener(
        "animationend",
        () => {
          container.classList.remove("vpunch");
        },
        { once: true }
      );
    }
  }

  // 동영상 씬 처리
  if (scene.type === "video") {
    playVideo(scene);
    return;
  }

  // goto 처리
  if (scene.type === "goto") {
    const nextIndex = story.findIndex((s) => s.id === scene.next);
    if (nextIndex !== -1) {
      showScene(nextIndex);
    }
    return;
  }

  // 게임오버 처리
  if (scene.type === "gameover") {
    document.getElementById("gameOverText").textContent = scene.gameOverText;
    document.getElementById("gameOver").classList.add("show");
    return;
  }

  // 엔딩 처리
  if (scene.type === "ending") {
    showEnding(scene);
    return;
  }

  // 캐릭터 이미지 업데이트
  const speaker = scene.speaker || "나레이션";
  const characterImageEl = document.getElementById("characterImage");

  // 캐릭터별 이미지 표시
  if (
    scene.speaker &&
    scene.speaker !== "나레이션" &&
    scene.speaker !== "여주"
  ) {
    // image 번호가 지정되어 있으면 해당 이미지 표시
    if (scene.image) {
      const imagePath = `images/${scene.speaker.toLowerCase()}${
        scene.image
      }.png`;
      characterImageEl.innerHTML = `<img src="${imagePath}" alt="${scene.speaker}" style="max-height: 400px; object-fit: contain;">`;
    } else {
      characterImageEl.innerHTML = "";
    }
  } else {
    characterImageEl.innerHTML = "";
  }

  document.getElementById("characterName").textContent = "";

  // 장면에 설정된 호감도 변경이 있으면 한 번만 적용
  if (scene.affection && !scene._affectionApplied) {
    console.log(
      "Applying scene.affection:",
      scene.affection,
      "current affection before:",
      JSON.parse(JSON.stringify(affection))
    );
    for (let char in scene.affection) {
      if (affection[char] === undefined) affection[char] = 0;
      affection[char] += scene.affection[char];
    }
    scene._affectionApplied = true;
    console.log(
      "Affection after applying:",
      JSON.parse(JSON.stringify(affection))
    );
  }

  // 호감도 업데이트
  updateAffectionDisplay();

  // 선택지 및 효과음 초기화
  document.getElementById("choices").innerHTML = "";
  document.getElementById("soundEffect").textContent = "";

  // 기존 계속 버튼 제거
  const existingBtn = document.querySelector(".continue-button");
  if (existingBtn) {
    existingBtn.remove();
  }

  if (scene.type === "dialogue" || scene.type === "narration") {
    // 화자 이름 준비
    let speakerName = "";
    if (scene.speaker && scene.speaker !== "나레이션") {
      speakerName = `<div style="font-weight: bold; color: #667eea; margin-bottom: 16px; font-size: 1.1em;">${scene.speaker}</div>`;
    }

    // 대사 내용 준비
    let contentHTML = "";
    if (scene.thought) {
      contentHTML = `<div class="thought-text">${scene.text}</div>`;
    } else {
      contentHTML = scene.text;
    }

    if (scene.emotion) {
      contentHTML += `<div style="color: #999; font-style: italic; margin-top: 10px;">(${scene.emotion})</div>`;
    }

    // 타이핑 효과 시작
    startTypingEffect(speakerName, contentHTML);

    if (scene.sound) {
      document.getElementById("soundEffect").textContent = `♪ ${scene.sound}`;
    }

    // 계속 버튼 추가
    const continueBtn = document.createElement("button");
    continueBtn.className = "continue-button";
    continueBtn.textContent = "계속 →";
    continueBtn.onclick = () => {
      if (isTyping) {
        // 타이핑 중이면 즉시 완성
        skipTyping();
      } else {
        showScene(currentScene + 1);
      }
    };
    document.getElementById("dialogueBox").appendChild(continueBtn);

    // 동영상 트리거 확인
    if (scene.video) {
      const videoSceneIndex = story.findIndex((s) => s.id === scene.video);
      if (videoSceneIndex !== -1) {
        continueBtn.onclick = () => {
          if (isTyping) {
            skipTyping();
          } else {
            showScene(videoSceneIndex);
          }
        };
      }
    }
  } else if (scene.type === "choice") {
    document.getElementById("dialogueText").textContent = scene.question;

    const choicesDiv = document.getElementById("choices");
    scene.choices.forEach((choice) => {
      const btn = document.createElement("button");
      btn.className = "choice-button";
      btn.textContent = choice.text;
      btn.onclick = () => handleChoice(choice);
      choicesDiv.appendChild(btn);
    });
  }
}

// 선택 처리
function handleChoice(choice) {
  console.log("찾는 id:", choice.next);
  console.log(
    "스토리 모든 id:",
    story.map((s) => s.id)
  );
  // 호감도 변경
  if (choice.affection) {
    for (let char in choice.affection) {
      affection[char] += choice.affection[char];
    }
  }

  // 다음 씬 찾기
  if (choice.next) {
    const nextIndex = story.findIndex((s) => s.id === choice.next);
    if (nextIndex !== -1) {
      showScene(nextIndex);
    } else {
      showScene(currentScene + 1);
    }
  } else {
    showScene(currentScene + 1);
  }
}

// 호감도 표시
function updateAffectionDisplay() {
  const displayDiv = document.getElementById("affectionDisplay");
  console.log(
    "updateAffectionDisplay: current affection:",
    JSON.parse(JSON.stringify(affection))
  );
  displayDiv.innerHTML =
    '<div style="font-weight: bold; margin-bottom: 5px;">호감도 💕</div>';

  for (let char in affection) {
    if (affection[char] > 0) {
      const hearts = "❤️".repeat(Math.floor(affection[char]));
      displayDiv.innerHTML += `
                <div class="affection-item">
                    <span>${char}</span>
                    <span>${hearts}</span>
                </div>
            `;
    }
  }
}

// 동영상 재생
function playVideo(scene) {
  const videoContainer = document.getElementById("videoContainer");
  const videoPlayer = document.getElementById("videoPlayer");

  if (scene.youtubeId) {
    // YouTube 임베드
    videoContainer.innerHTML = `
            <div class="video-wrapper">
                <iframe id="youtubePlayer" class="video-player" 
                    src="https://www.youtube.com/embed/${scene.youtubeId}?autoplay=1" 
                    frameborder="0" 
                    allow="autoplay; encrypted-media" 
                    allowfullscreen>
                </iframe>
                <button class="skip-video-btn" onclick="skipVideo()">건너뛰기 →</button>
            </div>
        `;
  } else if (scene.videoUrl) {
    // 직접 동영상 파일
    videoPlayer.src = scene.videoUrl;
    videoPlayer.load();
    videoPlayer.play();

    videoPlayer.onended = () => {
      skipVideo();
    };
  }

  videoContainer.classList.add("show");
}

// 동영상 건너뛰기
function skipVideo() {
  const videoContainer = document.getElementById("videoContainer");
  videoContainer.classList.remove("show");

  // 다음 씬으로
  showScene(currentScene + 1);
}

// 엔딩 표시
function showEnding(scene) {
  document.getElementById("dialogueText").innerHTML = `
        <div style="text-align: center;">
            <h2 style="color: #667eea; margin-bottom: 20px;">${scene.subtitle}</h2>
            <p style="font-size: 1.2em; line-height: 1.8;">${scene.text}</p>
            <div style="margin-top: 30px; font-size: 2em;"></div>
        </div>
    `;

  updateAffectionDisplay();

  const continueBtn = document.createElement("button");
  continueBtn.className = "continue-button";
  continueBtn.textContent = "다시 시작";
  continueBtn.onclick = () => location.reload();
  continueBtn.style.alignSelf = "center";
  continueBtn.style.marginTop = "30px";
  continueBtn.style.padding = "15px 40px";
  continueBtn.style.fontSize = "1.2em";
  document.getElementById("dialogueBox").appendChild(continueBtn);
}

// 타이핑 효과 함수
function startTypingEffect(speakerName, contentHTML) {
  const dialogueTextEl = document.getElementById("dialogueText");

  // 이전 타이핑 중단
  if (typingInterval) {
    clearInterval(typingInterval);
  }

  isTyping = true;

  // HTML 태그를 파싱하여 텍스트와 태그를 분리
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = contentHTML;

  // 화자 이름은 즉시 표시
  dialogueTextEl.innerHTML = speakerName;

  // 텍스트 노드만 추출하여 타이핑
  const fullText = tempDiv.textContent || tempDiv.innerText;
  let currentIndex = 0;

  // 타이핑 컨테이너 생성
  const typingContainer = document.createElement("div");
  if (tempDiv.querySelector(".thought-text")) {
    typingContainer.className = "thought-text";
  }
  dialogueTextEl.appendChild(typingContainer);

  typingInterval = setInterval(() => {
    if (currentIndex < fullText.length) {
      typingContainer.textContent = fullText.substring(0, currentIndex + 1);
      currentIndex++;
    } else {
      clearInterval(typingInterval);
      isTyping = false;
      // 완성된 HTML로 교체 (이모션 태그 등 포함)
      dialogueTextEl.innerHTML = speakerName + contentHTML;
    }
  }, 50); // 50ms마다 한 글자씩 (속도 조절 가능)
}

// 타이핑 스킵 함수
function skipTyping() {
  if (typingInterval) {
    clearInterval(typingInterval);
    typingInterval = null;
  }
  isTyping = false;

  // 현재 씬의 전체 텍스트를 즉시 표시
  const scene = story[currentScene];
  const dialogueTextEl = document.getElementById("dialogueText");

  let dialogueHTML = "";
  if (scene.speaker && scene.speaker !== "나레이션") {
    dialogueHTML = `<div style="font-weight: bold; color: #667eea; margin-bottom: 8px; font-size: 1.1em;">${scene.speaker}</div>`;
  }

  if (scene.thought) {
    dialogueHTML += `<div class="thought-text">${scene.text}</div>`;
  } else {
    dialogueHTML += scene.text;
  }

  if (scene.emotion) {
    dialogueHTML += `<div style="color: #999; font-style: italic; margin-top: 10px;">(${scene.emotion})</div>`;
  }

  dialogueTextEl.innerHTML = dialogueHTML;
}

// Enter 키로 게임 시작
document
  .getElementById("nicknameInput")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      startGame();
    }
  });

// BGM 토글 함수: HTML의 버튼 onclick="toggleBgm()"에 연결됨
function toggleBgm() {
  const bgm = document.getElementById("bgm");
  const btn = document.querySelector('button[onclick="toggleBgm()"]');
  if (!bgm) return;

  // 재생 중이면 일시정지, 일시정지면 재생
  if (bgm.paused) {
    bgm
      .play()
      .then(() => {
        if (btn) btn.textContent = "🔊 BGM";
      })
      .catch((err) => {
        console.warn("BGM 재생 실패:", err);
      });
  } else {
    bgm.pause();
    if (btn) btn.textContent = "🔈 BGM OFF";
  }
}
