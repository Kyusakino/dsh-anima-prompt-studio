/* Prompt studio: manual prompt workbench for Anima / H3, shown in the left sidebar. */
window.__ModuleLoader__.load({
  id: '@local/prompt-studio',
  factory(require) {
    const React = require('react');
    const h = React.createElement;
    const { useState, useEffect, useLayoutEffect, useRef } = React;

    const ZH = {
      panelTitle: 'Anima 提示词工作台',
      presetLabel: '预设',
      tagLabel: '标签（输入时自动补全）',
      tagPlaceholder: '1girl, solo, short hair, jacket, rooftop',
      artistLabel: '画师',
      artistPlaceholder: '输入画师名，自动补 @（如 wlop）',
      subjectLabel: '主体 / 角色（自然语言）',
      subjectPlaceholder: '例：a traveler crossing a bridge',
      sceneLabel: '场景 / 构图',
      scenePlaceholder: 'forest footbridge, tall trees, wide shot',
      lightLabel: '光照 / 氛围 / 风格',
      lightPlaceholder: 'soft morning light, backlight, bokeh petals, nostalgic mood',
      freeLabel: '自由文本（追加）',
      freePlaceholder: '可选：多角色方位、动作、对白等',
      negativeLabel: '额外负面词（追加）',
      negativePlaceholder: '可选：追加自己的负面标签',
      moreFields: '更多提示词字段',
      quickTags: '常用标签',
      quickArtists: '画师示例',
      characterTags: '角色推荐（可选）',
      weight: '权重',
      weightLabel: '权重（选中文字或最后一个标签后点）',
      wrapFailed: '先在标签框里选中文字',
      previewTitle: '预览',
      previewLabel: '正向提示词',
      negativePreviewLabel: '负面提示词',
      copyPositive: '复制正向词',
      copyNegative: '复制负面词',
      clear: '清空',
      restorePreset: '恢复默认预设',
      copied: '已复制',
      copyFailed: '复制失败，请手动选中复制',
      emptyCopy: '没有可复制的内容',
      checksTitle: '自检',
      checkNoQuality: '缺少质量前缀（建议 masterpiece, best quality, score_7, safe,）',
      checkCjk: '含中文：建议用中文标签补全插件转成英文 Danbooru 标签',
      checkUnderscore: '下划线标签应改为空格（score_* 除外）',
      checkWeight: '权重高于 2.0，可能崩坏',
      checkCount: '人物镜头建议带人数标签：1girl / 1boy / solo / 2girls',
      checkNegative: '负面词缺少官方推荐质量词',
      checkLong: '提示词偏长，注意标签冲突',
      checkEmpty: '还没有内容',
      checkOk: '没有发现问题',
      hintFooter: '复制后粘贴到 ComfyUI 的 CLIPTextEncode，或分镜 JSON 的 image.prompt；H3 视频提示词写动作/镜头/声音，不要堆标签。',
      examplesTitle: '示例',
      exampleSlope: '林间空镜',
      exampleDuo: '咖啡馆对话',
      exampleOriginal: '屋顶人物',
      presetAnimaAesthetic: 'Anima Aesthetic（定稿）',
      presetAnimaTurbo: 'Anima Turbo（试稿）',
      presetComicDrama: '漫剧分镜（动画风）',
      presetH3Realistic: 'H3 Image 写实',
      presetCustom: '自定义（自由文本）',
      settingsAnimaAesthetic: '30–50 步 · CFG 4–5 · er_sde / euler_a · 512–1536px',
      settingsAnimaTurbo: '8–12 步 · CFG 1 · euler · 512–1536px',
      settingsComicDrama: '30 步 · CFG 4.5 · 1280×736 · 参考图适配器可锁角色',
      settingsH3Realistic: 'H3 Image：6 步 · CFG 1 · 2560×1440 · 内置 Qwen3.5 扩写',
      settingsCustom: '按你的模型/工作流自行设置',
      chars: '字符',
      tagsCount: '个标签',
      cursorPosition: '行 {line}，列 {column}',
      estTokens: '约 tokens',
      suggestions: '补全',
      line: '行',
      suggestHint: '↑↓ 选择 · Enter/Tab 插入 · Esc 关闭',
      sortTags: '整理顺序',
      sortDone: '已整理：{n} 个标签（去重 {dup}）',
      saveSnapshot: '保存快照',
      history: '历史',
      historyEmpty: '还没有快照',
      restore: '恢复',
      delete: '删除',
      snapshotSaved: '已保存快照',
      exportTitle: '导出',
      exportFormat: '格式',
      exportName: '文件名',
      exportText: '纯文本（ComfyUI 用）',
      exportJson: 'JSON（带参数记录）',
      exportShotlist: 'shotlist v2 片段（接入项目）',
      copyContent: '复制内容',
      downloadFile: '下载文件',
      exportFolder: '导出到文件夹',
      exportFolderHint: '选择目标文件夹。浏览器支持 File System Access API 时可直接写入。',
      exportedTo: '已导出：{name}',
      folderUnsupported: '当前浏览器不支持文件夹导出，请用“下载文件”',
      exportFailed: '导出失败：{err}',
      copiedContent: '已复制导出内容',
      shotId: '镜头 ID',
      projectId: '项目 ID',
      qualityFix: '补质量前缀',
      qualityFixed: '已补充质量前缀/负面词',
      expandEditor: '展开编辑器',
      collapseEditor: '收起编辑器',
    };

    const EN = {
      panelTitle: 'Anima Prompt Studio',
      presetLabel: 'Preset',
      tagLabel: 'Tags (autocomplete while typing)',
      tagPlaceholder: '1girl, solo, short hair, jacket, rooftop',
      artistLabel: 'Artist',
      artistPlaceholder: 'Type an artist name; @ is added automatically (e.g. wlop)',
      subjectLabel: 'Subject / character (natural language)',
      subjectPlaceholder: 'e.g. a traveler crossing a bridge',
      sceneLabel: 'Scene / composition',
      scenePlaceholder: 'forest footbridge, tall trees, wide shot',
      lightLabel: 'Lighting / mood / style',
      lightPlaceholder: 'soft morning light, backlight, bokeh petals, nostalgic mood',
      freeLabel: 'Free text (appended)',
      freePlaceholder: 'Optional: multi-character positions, action, dialogue',
      negativeLabel: 'Extra negative tags (appended)',
      negativePlaceholder: 'Optional: extra negative tags',
      moreFields: 'More prompt fields',
      quickTags: 'Common tags',
      quickArtists: 'Artist examples',
      characterTags: 'Character suggestions (optional)',
      weight: 'Weight',
      weightLabel: 'Weight (select text or the last tag, then click)',
      wrapFailed: 'Select text in the tag box first',
      previewTitle: 'Preview',
      previewLabel: 'Positive prompt',
      negativePreviewLabel: 'Negative prompt',
      copyPositive: 'Copy positive',
      copyNegative: 'Copy negative',
      clear: 'Clear',
      restorePreset: 'Reset to default preset',
      copied: 'Copied',
      copyFailed: 'Copy failed; select and copy manually',
      emptyCopy: 'Nothing to copy',
      checksTitle: 'Checks',
      checkNoQuality: 'Missing quality prefix (masterpiece, best quality, score_7, safe,)',
      checkCjk: 'Chinese characters found: convert them to English Danbooru tags',
      checkUnderscore: 'Use spaces instead of underscores (score_* excepted)',
      checkWeight: 'Weight above 2.0 may break the image',
      checkCount: 'Character shots should include a count tag: 1girl / 1boy / solo / 2girls',
      checkNegative: 'Negative prompt is missing the official quality terms',
      checkLong: 'Prompt is long; watch for conflicting tags',
      checkEmpty: 'Nothing written yet',
      checkOk: 'No issues found',
      hintFooter: 'Paste into ComfyUI CLIPTextEncode or the shotlist image.prompt; H3 video prompts should describe motion/camera/sound, not tags.',
      examplesTitle: 'Examples',
      exampleSlope: 'Forest footbridge',
      exampleDuo: 'Café dialogue',
      exampleOriginal: 'Rooftop portrait',
      presetAnimaAesthetic: 'Anima Aesthetic (final)',
      presetAnimaTurbo: 'Anima Turbo (draft)',
      presetComicDrama: 'Comic-drama panels (anime)',
      presetH3Realistic: 'H3 Image realistic',
      presetCustom: 'Custom (free form)',
      settingsAnimaAesthetic: '30–50 steps · CFG 4–5 · er_sde / euler_a · 512–1536px',
      settingsAnimaTurbo: '8–12 steps · CFG 1 · euler · 512–1536px',
      settingsComicDrama: '30 steps · CFG 4.5 · 1280×736 · reference adapter for character lock',
      settingsH3Realistic: 'H3 Image: 6 steps · CFG 1 · 2560×1440 · built-in Qwen3.5 expansion',
      settingsCustom: 'Set steps/CFG for your own model',
      chars: 'chars',
      tagsCount: 'tags',
      cursorPosition: 'Ln {line}, Col {column}',
      estTokens: '~tokens',
      suggestions: 'Suggestions',
      line: 'line',
      suggestHint: '↑↓ choose · Enter/Tab insert · Esc close',
      sortTags: 'Sort tags',
      sortDone: 'Sorted {n} tags and removed {dup} duplicates',
      saveSnapshot: 'Save snapshot',
      history: 'History',
      historyEmpty: 'No snapshots yet',
      delete: 'Delete',
      snapshotSaved: 'Snapshot saved',
      exportTitle: 'Export',
      exportFormat: 'Format',
      exportName: 'Filename',
      exportText: 'Plain text (ComfyUI)',
      exportJson: 'JSON (with settings)',
      exportShotlist: 'Shotlist v2 fragment',
      copyContent: 'Copy contents',
      downloadFile: 'Download',
      exportFolder: 'Save to folder',
      exportFolderHint: 'Choose a destination folder in a browser that supports folder access.',
      exportedTo: 'Exported {name}',
      folderUnsupported: 'This browser does not support folder export. Use Download.',
      exportFailed: 'Export failed: {err}',
      copiedContent: 'Export copied',
      shotId: 'Shot ID',
      projectId: 'Project ID',
      qualityFix: 'Add quality tags',
      qualityFixed: 'Quality tags and negative prompt updated',
      expandEditor: 'Expand editor',
      collapseEditor: 'Collapse editor',
    };

    const ANIMA_NEGATIVE =
      'worst quality, low quality, score_1, score_2, score_3, artist name, blurry, jpeg artifacts, chromatic aberration';

    const PRESETS = [
      {
        id: 'anima_aesthetic', labelKey: 'presetAnimaAesthetic', settingsKey: 'settingsAnimaAesthetic',
        prefix: 'masterpiece, best quality, score_7, safe,', suffix: '', negative: ANIMA_NEGATIVE, anima: true,
      },
      {
        id: 'anima_turbo', labelKey: 'presetAnimaTurbo', settingsKey: 'settingsAnimaTurbo',
        prefix: 'masterpiece, best quality, score_7, safe,', suffix: '', negative: ANIMA_NEGATIVE, anima: true,
      },
      {
        id: 'comic_drama', labelKey: 'presetComicDrama', settingsKey: 'settingsComicDrama',
        prefix: 'masterpiece, best quality, score_7, safe,',
        suffix: 'anime TV series style, 2D cel shading, clean line art, cinematic lighting',
        negative: ANIMA_NEGATIVE, anima: true,
      },
      {
        id: 'h3_image_realistic', labelKey: 'presetH3Realistic', settingsKey: 'settingsH3Realistic',
        prefix: 'cinematic photoreal film still, 35mm lens, natural skin texture, realistic lighting, shallow depth of field,',
        suffix: '', negative: '', anima: false,
      },
      {
        id: 'custom', labelKey: 'presetCustom', settingsKey: 'settingsCustom',
        prefix: '', suffix: '', negative: '', anima: false,
      },
    ];

    const EXAMPLES = [
      {
        id: 'slope', labelKey: 'exampleSlope',
        fields: {
          tags: 'scenery, no humans, forest, bridge, river, fog, wide shot',
          subject: 'a wooden footbridge spans a shallow river',
          scene: 'tall trees on both banks, distant hills',
          light: 'soft overcast light, mist above the water',
        },
      },
      {
        id: 'duo', labelKey: 'exampleDuo',
        fields: {
          tags: '1boy, 1girl, two-shot, face to face, cafe, table, casual clothes',
          subject: 'two people talk over coffee by a window',
          scene: 'eye-level framing, cups on a small table',
          light: 'warm afternoon light through the window',
        },
      },
      {
        id: 'original', labelKey: 'exampleOriginal',
        fields: {
          tags: '1girl, solo, short hair, jacket, rooftop, looking at viewer',
          subject: 'a woman turns toward the camera on a city rooftop',
          scene: 'medium shot, distant apartment buildings',
          light: 'soft evening light, muted blue sky',
        },
      },
    ];

    const QUICK_TAGS = [
      '1girl', '1boy', 'solo', '2girls', 'wide shot', 'full body', 'cowboy shot',
      'upper body', 'close-up', 'from behind', 'looking at viewer', 'smile', 'blush',
      'cherry blossoms', 'falling petals', 'school uniform', 'sailor collar', 'red ribbon',
      'backlight', 'bokeh', 'depth of field', 'cinematic lighting', 'anime', '2D cel shading',
    ];

    // 角色名只是可选推荐；不写角色名时用 1girl/1boy + 外观标签描述即可。
    const CHARACTER_TAGS = [
      'hatsune miku', 'saber', 'rem', 'asuna', 'kafuu chino', 'holo',
      'yor briar', 'anya forger', 'miku nakano', 'kurumi tokisaki',
      'original character', 'student', 'young woman', 'young man',
    ];

    // Top 3000 of the 59,676 Danbooru artist tags recognized by Anima 2B.
    // Source: https://github.com/ThetaCursed/Anima-Style-Explorer/blob/main/Anima2B_Artist_Index_59k.txt
    // See THIRD_PARTY_NOTICES.md for the source license.
    const ARTIST_TAGS = [
      "@dairi",
      "@ebifurya",
      "@hammer (sunset beach)",
      "@haruyama kazunori",
      "@ruu (tksymkw)",
      "@itomugi-kun",
      "@yaegashi nan",
      "@mizuki hitoshi",
      "@kouji (campus life)",
      "@kanon (kurogane knights)",
      "@rebecca (keinelove)",
      "@bkub",
      "@kou hiyoyo",
      "@naga u",
      "@ojipon",
      "@tani takeshi",
      "@pageratta",
      "@hara (harayutaka)",
      "@onikobe rin",
      "@inoino",
      "@matsunaga kouyou",
      "@tony taka",
      "@blade (galaxist)",
      "@bow (bhp)",
      "@a1 (initial-g)",
      "@ixy",
      "@hiroki (yyqw7151)",
      "@ido (teketeke)",
      "@chihuri",
      "@futa (nabezoko)",
      "@bb (baalbuddy)",
      "@m-da s-tarou",
      "@hews",
      "@hungry clicker",
      "@hisahiko",
      "@dd (ijigendd)",
      "@yohane",
      "@kirisawa juuzou",
      "@minaba hideo",
      "@tsukudani (coke-buta)",
      "@zounose",
      "@boris (noborhys)",
      "@carnelian",
      "@hana kazari",
      "@nyantcha",
      "@rariatto (ganguri)",
      "@warugaki (sk-ii)",
      "@abubu",
      "@hamu koutarou",
      "@houtengeki",
      "@shiseki hirame",
      "@kani biimu",
      "@kantoku",
      "@nanashi (nlo)",
      "@kato takuji",
      "@slugbox",
      "@gomashio (goma feet)",
      "@avogado6",
      "@iesupa",
      "@tsukishiro saika",
      "@takafumi",
      "@ichimi",
      "@hisona (suaritesumi)",
      "@yukie (kusaka shi)",
      "@drawfag",
      "@milkpanda",
      "@yua (checkmate)",
      "@mizumizuni",
      "@sofra",
      "@sincos",
      "@tsunako",
      "@kouno (masao)",
      "@neocoill",
      "@koyama shigeru",
      "@kanikama",
      "@konoshige (ryuun)",
      "@horosuke",
      "@shino (ponjiyuusu)",
      "@ueyama michirou",
      "@namori",
      "@belko",
      "@dagasi",
      "@izumi tsubasu",
      "@tsuruse",
      "@ginhaha",
      "@wa (genryusui)",
      "@anti (untea9)",
      "@agawa ryou",
      "@taisa (kari)",
      "@sayori (neko works)",
      "@tsuda nanafushi",
      "@kotorai",
      "@toosaka asagi",
      "@echo (circa)",
      "@takeuchi takashi",
      "@sumiyao (amam)",
      "@rokugou daisuke",
      "@yamamoto souichirou",
      "@null (nyanpyoun)",
      "@gonzarez",
      "@yuuhagi (amaretto-no-natsu)",
      "@nekotoufu",
      "@gweda",
      "@mattaku mousuke",
      "@yuuji (and)",
      "@saiguchi otoufu",
      "@fujima takuya",
      "@diva (hyxpk)",
      "@enkyo yuuichirou",
      "@lolita channel",
      "@kitsunerider",
      "@miyo (ranthath)",
      "@mochi au lait",
      "@haruhisky",
      "@torotei",
      "@beni shake",
      "@tomose shunsaku",
      "@kashikaze",
      "@clearite",
      "@fumihiko (fu mihi ko)",
      "@hinghoi",
      "@zen (kamuro)",
      "@mizuki makoto",
      "@hizaka",
      "@yd (orange maru)",
      "@kaamin (mariarose753)",
      "@chigusa minori",
      "@minami (colorful palette)",
      "@ichikawa feesu",
      "@imu sanjo",
      "@nikorashi-ka",
      "@ishikei",
      "@afrobull",
      "@merunyaa",
      "@shiromanta",
      "@ayu (mog)",
      "@yuureidoushi (yuurei6214)",
      "@tukiwani",
      "@kamille (vcx68)",
      "@goma (gomasamune)",
      "@kasumi (skchkko)",
      "@takiki",
      "@matsuryuu",
      "@youyume-kun",
      "@rappa (rappaya)",
      "@creayus",
      "@shirosato",
      "@oouso",
      "@aaaa (quad-a)",
      "@shimazaki mujirushi",
      "@mery (yangmalgage)",
      "@ohisashiburi",
      "@koruri",
      "@chanta (ayatakaoisii)",
      "@jako (jakoo21)",
      "@asanagi",
      "@ha akabouzu",
      "@yukito (dreamrider)",
      "@pokemoa",
      "@cle masahiro",
      "@ilya kuvshinov",
      "@ebi 193",
      "@eromame",
      "@personal ami",
      "@yunamaro",
      "@murakami suigun",
      "@ikeuchi tanuma",
      "@yuichirou",
      "@k-suwabe",
      "@as109",
      "@rotte (1109)",
      "@kaigen 1025",
      "@butcha-u",
      "@shimada fumikane",
      "@sorimachi-doufu",
      "@aldehyde",
      "@dishwasher1910",
      "@lets0020",
      "@mk (mod0)",
      "@kame (kamepan44231)",
      "@gurande (g-size)",
      "@phantom ix row",
      "@sheya",
      "@katahira masashi",
      "@dokomon",
      "@kinkymation",
      "@b-ginga",
      "@kankan33333",
      "@tonda",
      "@e.o.",
      "@kanduki kamibukuro",
      "@agahari",
      "@ini (inunabe00)",
      "@fuuzasa",
      "@cutesexyrobutts",
      "@fumio (rsqkr)",
      "@menma (enaic31)",
      "@bubukka",
      "@usashiro mani",
      "@mizuhara aki",
      "@ito noizi",
      "@niliu chahui",
      "@mikage takashi",
      "@kujou karasuma",
      "@fusu (a95101221)",
      "@samneco",
      "@waero",
      "@karukan (monjya)",
      "@kuromiya",
      "@mizumoto tadashi",
      "@ogami kazuki",
      "@asutora",
      "@mauve",
      "@meito (maze)",
      "@kilye kairi",
      "@sekina",
      "@mishima kurone",
      "@suzuhira hiro",
      "@nori tamago",
      "@tonee",
      "@mitya",
      "@tk8d32",
      "@kawashina (momen silicon)",
      "@mikozin",
      "@ootsuki wataru",
      "@moisture (chichi)",
      "@dr rex",
      "@homare (fool's art)",
      "@daram (shappydude)",
      "@jjune",
      "@niwatazumi",
      "@isshiki (ffmania7)",
      "@swd3e2",
      "@otokuyou",
      "@seraziel",
      "@buzzlyears",
      "@fujigaya arctia",
      "@chikuwa.",
      "@kuavera",
      "@yanyo (ogino atsuki)",
      "@asamura hiori",
      "@cato (monocatienus)",
      "@sky-freedom",
      "@yomu (sgt epper)",
      "@satou kibi",
      "@himura kiseki",
      "@yoshi tama",
      "@engiyoshi",
      "@imizu (nitro unknown)",
      "@makuwauri",
      "@asteroid ill",
      "@watanabe akio",
      "@ebora",
      "@ririko (zhuoyandesailaer)",
      "@jokanhiyou",
      "@niiko (gonnzou)",
      "@nishi koutarou",
      "@akairiot",
      "@negom",
      "@akitsuki karasu",
      "@happoubi jin",
      "@yopparai oni",
      "@optionaltypo",
      "@tf cafe",
      "@dandon fuga",
      "@momoko (momopoco)",
      "@karaagetarou",
      "@kurukurumagical",
      "@oryo (oryo04)",
      "@nanase nao",
      "@izawa (bhive003)",
      "@cougar (cougar1404)",
      "@dei shirou",
      "@horn/wood",
      "@saku usako (rabbit)",
      "@yabuki kentarou",
      "@sakura oriko",
      "@maturiuta sorato",
      "@frapowa",
      "@masukuza j",
      "@xinzoruo",
      "@ramchi",
      "@wakabayashi toshiya",
      "@meow (nekodenki)",
      "@hori (hori no su)",
      "@kase daiki",
      "@ikuchan kaoru",
      "@hidefu kitayan",
      "@colorful palette",
      "@cait aron",
      "@yokochou",
      "@ajitarou (setsu)",
      "@dikko",
      "@kukie-nyan",
      "@a re",
      "@mossacannibalis",
      "@yano toshinori",
      "@misaki kurehito",
      "@gaoo (frpjx283)",
      "@ama mitsuki",
      "@uccow",
      "@unya",
      "@pentagon (railgun ky1206)",
      "@suzuki toto",
      "@hotathino",
      "@nanakusa suzuna",
      "@yoshio (55level)",
      "@jmg",
      "@furaggu (frag 0416)",
      "@ryuuichi (f dragon)",
      "@rino cnc",
      "@gomennasai",
      "@maru (marg0613)",
      "@yamashita shun'ya",
      "@pote (ptkan)",
      "@bee (deadflow)",
      "@noai nioshi",
      "@meyoco",
      "@piromizu",
      "@takato kurosuke",
      "@jack dempa",
      "@ban! (bansankan)",
      "@kishida mel",
      "@mitsumoto jouji",
      "@tanaka kusao",
      "@gofu",
      "@zyugoya",
      "@kairunoburogu",
      "@re ghotion",
      "@kagami hirotaka",
      "@92m",
      "@milkshakework",
      "@lack",
      "@koto inari",
      "@momo no sukebe",
      "@kashiwamochi yomogi",
      "@gibagiba",
      "@oyari ashito",
      "@aoki (fumomo)",
      "@harada takehito",
      "@eu03",
      "@satou yuuki",
      "@lpip",
      "@mikeou",
      "@utano",
      "@waterring",
      "@kanpa (campagne 9)",
      "@oekakizuki",
      "@tima",
      "@urushihara satoshi",
      "@gunjyou (gunjyou 00)",
      "@mota",
      "@kazenokaze",
      "@colonel aki",
      "@scottie (phantom2)",
      "@obiwan",
      "@elf (stroll in the woods)",
      "@bigrbear",
      "@ninahachi",
      "@kaisen chuui",
      "@ikari manatsu",
      "@6 (yuchae)",
      "@kanzakietc",
      "@aoshima",
      "@chan co",
      "@goma (yoku yatta hou jane)",
      "@gmkj",
      "@hizuki yayoi",
      "@zanntetu",
      "@abmayo",
      "@spacezin",
      "@ulrich (tagaragakuin)",
      "@kazuma muramasa",
      "@ayamy",
      "@kemachiku",
      "@rtil",
      "@riyo (lyomsnpmp)",
      "@morino hon",
      "@serebi ryousangata",
      "@tanabe (fueisei)",
      "@niwarhythm",
      "@jinguu (4839ms)",
      "@riichu",
      "@kloah",
      "@massakasama",
      "@jazz jack",
      "@syhan",
      "@bai lao shu",
      "@himajin noizu",
      "@annin musou",
      "@seo tatsuya",
      "@rokuwata tomoe",
      "@sakiyamama",
      "@yukimoto shuuji (gurigura)",
      "@fkey",
      "@misumi (macaroni)",
      "@iizuki tasuku",
      "@kirishima satoshi",
      "@youko-shima",
      "@fumio (ura fmo)",
      "@sakazaki freddy",
      "@kichihachi",
      "@wanta (futoshi)",
      "@kuro kosyou",
      "@ru zhai",
      "@minakami (flyingman555)",
      "@nii manabu",
      "@moke ro",
      "@ootomo takuji",
      "@aztodio",
      "@mogudan",
      "@rinka (qqqrinkappp)",
      "@moyazou (kitaguni moyashi seizoujo)",
      "@huke",
      "@taromarun",
      "@hoshizuki (seigetsu)",
      "@asaya minoru",
      "@doitsuken",
      "@meremero",
      "@criis-chan",
      "@koyorin",
      "@shengtian",
      "@mika pikazo",
      "@rororo",
      "@nt00",
      "@takeuchi ryousuke",
      "@sousouman",
      "@aestheticc-meme",
      "@kusaka souji",
      "@kopaka (karda nui)",
      "@do m kaeru",
      "@ryoji (nomura ryouji)",
      "@awa",
      "@jcm2",
      "@kiritto",
      "@jun (navigavi)",
      "@em (totsuzen no hakike)",
      "@nironiro",
      "@umanosuke",
      "@sakurazawa izumi",
      "@mo (kireinamo)",
      "@inaba shiki",
      "@shichimenchou",
      "@jin (mugenjin)",
      "@umigarasu (kitsune1963)",
      "@samip",
      "@catstudioinc (punepuni)",
      "@zunusama",
      "@yuuji (yukimimi)",
      "@mashiro yukiya",
      "@nanao naru",
      "@fu-ta",
      "@7010",
      "@omachi (slabco)",
      "@ragho no erika",
      "@odawara hakone",
      "@magukappu",
      "@kabayaki (kabayaki eel)",
      "@bbb (friskuser)",
      "@lamb-oic029",
      "@shirabi",
      "@cluseller",
      "@papa (shimeguru)",
      "@setz",
      "@tenken (gotannda)",
      "@eroe",
      "@eiri (eirri)",
      "@akinbo (hyouka fuyou)",
      "@greem bang",
      "@choufu shimin",
      "@bosshi",
      "@kenkou cross",
      "@kfr",
      "@nardack",
      "@mashutarou (neko no oyashiro)",
      "@lambda (kusowarota)",
      "@niichi (komorebi-palette)",
      "@no+bi=",
      "@sakimichan",
      "@tandohark",
      "@ominaeshi (takenoko)",
      "@kurikara",
      "@ergot",
      "@deadnooodles",
      "@sakuraba yuuki",
      "@okina ika",
      "@cis (carcharias)",
      "@ma rukan",
      "@untue",
      "@mudou eichi",
      "@hagoonha",
      "@minato ojitan",
      "@hong (white spider)",
      "@mamerakkkkko",
      "@harada (sansei rain)",
      "@wisespeak",
      "@nagian",
      "@pas (paxiti)",
      "@nishieda",
      "@haru (nakajou-28)",
      "@vahn yourdoom",
      "@maruki (punchiki)",
      "@arinu",
      "@huyumitsu",
      "@40hara",
      "@akkijin",
      "@liya",
      "@mozukuzu (manukedori)",
      "@moyoron",
      "@blacknirrow",
      "@club3",
      "@eto (ikumika)",
      "@foxyreine",
      "@daiaru",
      "@kamogawa tanuki",
      "@unfairr",
      "@satou daiji",
      "@ittokyu",
      "@mel (melty pot)",
      "@geewhy",
      "@jeno",
      "@pochimaru (marumaru wanwan)",
      "@haimura kiyotaka",
      "@tofuubear",
      "@lasterk",
      "@mimonel",
      "@non (z-art)",
      "@hospital king",
      "@konnyaku (kk-monmon)",
      "@tsurui",
      "@yuuki hagure",
      "@sei (kaien kien)",
      "@murata range",
      "@ino (magloid)",
      "@chengongzi123",
      "@atdan",
      "@shirow masamune",
      "@guin guin",
      "@aono3",
      "@yume no owari",
      "@fuzichoco",
      "@oimanji",
      "@g (genesis1556)",
      "@shibasaki shouji",
      "@sciamano240",
      "@hikawa shou",
      "@tsukiman",
      "@hase yu",
      "@erere",
      "@unasaka ryou",
      "@azasuke",
      "@kabocha torute",
      "@iwbitu",
      "@miyagoe yoshitsuki",
      "@kamelie",
      "@sunnysideup",
      "@saru",
      "@oni-noboru",
      "@aki99",
      "@ishii hisao",
      "@aster crowley",
      "@roke (taikodon)",
      "@gotoh (nekocat)",
      "@horiguchi yukiko",
      "@ke-ta",
      "@kara (color)",
      "@chado",
      "@mitsumi misato",
      "@komone ushio",
      "@sugimori ken",
      "@kei jiei",
      "@nonco",
      "@waka (wk4444)",
      "@fujisaki hikari",
      "@starshadowmagician",
      "@syope",
      "@e20",
      "@lindaroze",
      "@hayabusa (vert 320)",
      "@kou mashiro",
      "@miuku (marine sapphire)",
      "@sakino shingetsu",
      "@yagisaka seto",
      "@raptor7",
      "@neoartcore",
      "@lvl (sentrythe2310)",
      "@kawayabug",
      "@coroha",
      "@varniskarnis",
      "@kishida shiki",
      "@hibiki (zerocodo)",
      "@miyase mahiro",
      "@otohime (youngest princess)",
      "@yukataro",
      "@no-kan",
      "@komatsu eiji",
      "@momio",
      "@blew andwhite",
      "@ibuki notsu",
      "@adsouto",
      "@distr",
      "@youkan",
      "@konbu wakame",
      "@kusanagi tonbo",
      "@ryusei hashida",
      "@jjanda",
      "@shigino sohuzi",
      "@redrop",
      "@isshi pyuma",
      "@yuune (ayanepuna)",
      "@urin",
      "@akina tsukako",
      "@qp:flapper",
      "@mamaloni",
      "@takasuma hiro",
      "@sano toshihide",
      "@gaou (umaiyo puyoman)",
      "@kapatarou",
      "@komeshiro kasu",
      "@modare",
      "@liang xing",
      "@rakugaki-biyori",
      "@mignon",
      "@monety",
      "@na-ga",
      "@gashi-gashi",
      "@yuki00yo",
      "@i.u.y",
      "@mamuru",
      "@genyaky",
      "@pipi (m1x mix)",
      "@minato hitori",
      "@yume shokunin",
      "@kutan",
      "@rui (sugar3)",
      "@kakure eria",
      "@fuantei",
      "@welt (kinsei koutenkyoku)",
      "@tsukareta san",
      "@mattari yufi",
      "@muririn",
      "@syuri22",
      "@rikatan",
      "@yaneko uta",
      "@torinone",
      "@mtu (orewamuzituda)",
      "@furukawa (yomawari)",
      "@sugimura tomokazu",
      "@melon22",
      "@reia 76",
      "@aozora market",
      "@parsley-f",
      "@mikazuki akira!",
      "@shin (new)",
      "@komaku juushoku",
      "@hanazora satsuki",
      "@kotatsu-mazoku",
      "@zandra",
      "@himeyamato",
      "@shiratama (shiratamaco)",
      "@cool-kyou shinja",
      "@fuji (pixiv24804665)",
      "@tetsu (kimuchi)",
      "@wada arco",
      "@nekoya (liu)",
      "@neki (wakiko)",
      "@jetto komusou",
      "@takayaki",
      "@hitotsuki nebura",
      "@donguri suzume",
      "@kitahama (siroimakeinu831)",
      "@apple caramel",
      "@topu",
      "@n.g.",
      "@madcore",
      "@mahoro (minase mahoro)",
      "@sakiecho",
      "@hanzou",
      "@deyui",
      "@coffee-kizoku",
      "@komusou (jinrikisha)",
      "@falken (yutozin)",
      "@yoo tenchi",
      "@engo (aquawatery)",
      "@chaesu",
      "@halcon",
      "@774 (nanashi)",
      "@allurmilk",
      "@born-to-die",
      "@bullfalk",
      "@cuboon",
      "@darumoon",
      "@harigane shinshi",
      "@aikawa ryou",
      "@kuzuryuu kennosuke",
      "@kawakami rokkaku",
      "@kousei (public planet)",
      "@shinama",
      "@zankuro",
      "@capriccio",
      "@meimaru inuchiyo",
      "@hot vr",
      "@haoni",
      "@torriet",
      "@zucchini",
      "@kobuichi",
      "@shexyo",
      "@mataro (matarou)",
      "@yt (wai-tei)",
      "@kashu (hizake)",
      "@yamashichi (mtseven)",
      "@cad (caddo)",
      "@masuyama ryou",
      "@rom (20)",
      "@marugoshi (54burger)",
      "@makicha (sasurainopink)",
      "@sydus",
      "@torisan",
      "@nigari (ngari 0115)",
      "@porforever",
      "@kyouda suzuka",
      "@hella p",
      "@peach88",
      "@kagematsuri",
      "@k hiro",
      "@meopun (meopen429)",
      "@joy ride",
      "@shimmer",
      "@hitsukuya",
      "@dopey (dopq)",
      "@lielos",
      "@ryuusei (mark ii)",
      "@akagashi hagane",
      "@whoosaku",
      "@hetza (hellshock)",
      "@kouno hikaru",
      "@kiyama satoshi",
      "@pataneet",
      "@nozo (hitomiz)",
      "@iwashi dorobou -r-",
      "@hayashiya zankurou",
      "@twin (tt lsh)",
      "@minamura haruki",
      "@petenshi (dr. vermilion)",
      "@hemogurobin a1c",
      "@hiten (hitenkei)",
      "@gotyou",
      "@hotate-chan",
      "@pekeko (pepekekeko)",
      "@inu (aerodog)",
      "@pako (pakosun)",
      "@u u zan",
      "@crumbles",
      "@kanabun",
      "@comodox",
      "@kuroboshi kouhaku",
      "@y.ssanoha",
      "@unowen",
      "@yamato nadeshiko (nadeshiko0328)",
      "@watarui",
      "@boushi-ya",
      "@liz (piyoko piyop)",
      "@ryouka (suzuya)",
      "@umekichi",
      "@norasuko",
      "@ewa (seraphhuiyu)",
      "@wata do chinkuru",
      "@onsoku inu",
      "@ett",
      "@tako-chan (hub dump)",
      "@shuri (84k)",
      "@jellytits-7",
      "@marumikan",
      "@omone hokoma agm",
      "@ucmm",
      "@sutahiro (donta)",
      "@ichiba youichi",
      "@caffein",
      "@bison cangshu",
      "@yoako",
      "@casino (casinoep)",
      "@t2r",
      "@lm (legoman)",
      "@jtveemo",
      "@sooon",
      "@herada mitsuru",
      "@jizeru (giselebon)",
      "@nottytiffy",
      "@myth1carts",
      "@alpha (yukai na nakamatachi)",
      "@koyuki (kotatsu358)",
      "@robaato",
      "@porurin",
      "@nanashiro gorou",
      "@kafun",
      "@amasora taichi",
      "@baffu",
      "@chita (ketchup)",
      "@konpeto",
      "@finalcake",
      "@shashaki",
      "@yoshizaki mine",
      "@sukoyaka (100hituzi)",
      "@amazuyu tatsuki",
      "@yamu (reverse noise)",
      "@mazjojo",
      "@popqn",
      "@momiji mao",
      "@hiro (hirohiro31)",
      "@chai (drawingchisanne)",
      "@mikagami hiyori",
      "@morisobo",
      "@nassukun",
      "@himiya jouzu",
      "@lokulo no mawashimono",
      "@xenon (for achieve)",
      "@khyle.",
      "@natsuki teru",
      "@jingai modoki",
      "@cian yo",
      "@mutsuki (moonknives)",
      "@thomas 8000",
      "@kurou (quadruple zero)",
      "@serizawa serizane",
      "@nyaru (nyaru 4126)",
      "@aoi (annbi)",
      "@kojima saya",
      "@tsuji santa",
      "@nanami (nunnun 0410)",
      "@surio",
      "@amazon (taitaitaira)",
      "@tenshin amaguri (inobeeto)",
      "@diesel-turbo",
      "@matsuda (matsukichi)",
      "@hamao",
      "@kimoshi",
      "@nogi takayoshi",
      "@sakimori dan",
      "@abe kanari",
      "@jabara tornado",
      "@lemon89h",
      "@gentsuki",
      "@satou kuuki",
      "@kawata hisashi",
      "@fuya (tempupupu)",
      "@m k",
      "@mae (maesanpicture)",
      "@kiku hitomoji",
      "@ameno (a meno0)",
      "@eudetenis",
      "@silence girl",
      "@sakimori (hououbds)",
      "@kiri futoshi",
      "@rei (rei's room)",
      "@nanoless",
      "@donburi (donburikazoku)",
      "@kimmy77",
      "@berusuke (beru no su)",
      "@pononozo",
      "@kurokoshou (emuburemu123)",
      "@hm (hmongt)",
      "@sen (astronomy)",
      "@seiru (prairie)",
      "@ateoyh",
      "@keenh",
      "@saishosaisekojo",
      "@m.m",
      "@osiimi",
      "@muuran",
      "@bacius",
      "@tama (tamago)",
      "@tama (tamatamo)",
      "@reverse (bluefencer)",
      "@tasaka shinnosuke",
      "@goto p",
      "@shibacha",
      "@hirasaka makoto",
      "@cream (nipakupa)",
      "@fugtrup",
      "@sazaki ichiri",
      "@barbariank",
      "@onija tarou",
      "@itou yuuji",
      "@harusame (unmei no ikasumi)",
      "@xiujia yihuizi",
      "@hairu",
      "@kobayashi chisato",
      "@kurozawa yui",
      "@tottotonero",
      "@felutiahime",
      "@sousou (sousouworks)",
      "@makuran",
      "@seihekiog",
      "@sumeragi kohaku",
      "@ricegnat",
      "@ray.s",
      "@nagishiro mito",
      "@eonsang",
      "@gogiga gagagigo",
      "@gakky",
      "@infinote",
      "@yone kinji",
      "@kotoyama",
      "@greatm8",
      "@seki (red shine)",
      "@kotoba noriaki",
      "@namaniku atk",
      "@fumitan (humitan)",
      "@kamiya maneki",
      "@saki chisuzu",
      "@heripantomorrow",
      "@norman maggot",
      "@exlic",
      "@ruukii drift",
      "@pochincoff",
      "@spam (spamham4506)",
      "@yappen",
      "@d-rex",
      "@alp",
      "@verdey",
      "@rioshi",
      "@miwa shirow",
      "@boa (brianoa)",
      "@socha",
      "@misumi (niku-kyu)",
      "@eretto",
      "@mokufuu",
      "@udon (shiratama)",
      "@nanaroku (fortress76)",
      "@michairu",
      "@hirano katsuyuki",
      "@daizu (melon-lemon)",
      "@shirotsumekusa",
      "@kotobuki (tiny life)",
      "@koku",
      "@satou shouji",
      "@konno tohiro",
      "@tsukumo (soar99)",
      "@mukakin",
      "@givuchoko",
      "@nigou",
      "@mosho",
      "@masami chie",
      "@merryweather",
      "@aogisa",
      "@karory",
      "@kaiman garupan",
      "@nagare",
      "@ringeko-chan",
      "@seramikku",
      "@suyasuyabi",
      "@tori (minamopa)",
      "@neon-tetora",
      "@blushyspicy",
      "@arnest",
      "@mizuryu kei",
      "@sak (lemondisk)",
      "@dermar",
      "@mikan (chipstar182)",
      "@seneto",
      "@koutaro",
      "@kasuga yukihito",
      "@greenteaneko",
      "@woodonly",
      "@ameyama denshin",
      "@nishikujic",
      "@orphen (pink seito)",
      "@tsukiyo (skymint)",
      "@akino shuu",
      "@hatano kiyoshi",
      "@musouzuki",
      "@pochi (pochi-goya)",
      "@kamikiririp",
      "@horideiyasumi",
      "@erubo",
      "@chamaji",
      "@oroborus",
      "@ndgd",
      "@yakob labo",
      "@ryouma (galley)",
      "@taketora suzume",
      "@seijun",
      "@sakimiya (inschool)",
      "@munmu-san",
      "@23 (real xxiii)",
      "@nora higuma",
      "@shinapuu",
      "@michael f91",
      "@mei (maysroom)",
      "@gazing eye",
      "@kisetsu",
      "@kumadano",
      "@kazutake hazano",
      "@themaestronoob",
      "@culter",
      "@osashin (osada)",
      "@ransusan",
      "@pokoten (pokoten718)",
      "@takanashi kei (hitsujikan)",
      "@nyong nyong",
      "@at classics",
      "@9law",
      "@katayama kei",
      "@machismo fuji",
      "@yuki arare",
      "@kokaki mumose",
      "@poronegi",
      "@wakura (gcdan)",
      "@yamabukiiro",
      "@iahfy",
      "@sunhyun",
      "@mibu natsuki",
      "@mizuumi (bb)",
      "@yuimisu",
      "@gawako",
      "@kuro suto sukii",
      "@mushi024",
      "@aile (crossroads)",
      "@mefomefo",
      "@cromachina",
      "@you (noanoamoemoe)",
      "@kumiko shiba",
      "@nonohara miki",
      "@kyata ti666",
      "@akchu",
      "@yukia (firstaid0)",
      "@morikura en",
      "@maki (seventh heaven maxion)",
      "@suujiniku",
      "@siu (siu0207)",
      "@zen33n",
      "@takana shinno",
      "@takatsuki ichi",
      "@kitahara tomoe (kitahara koubou)",
      "@futatsuki hisame",
      "@ancesra",
      "@haoro",
      "@rebe11",
      "@amezawa koma",
      "@mikkoukun",
      "@michii yuuki",
      "@kamisimo 90",
      "@nahaki",
      "@miclot",
      "@starraisins",
      "@senri gan",
      "@chacharan",
      "@mina cream",
      "@swordsouls",
      "@luke (dydansgur)",
      "@totokichi",
      "@at2.",
      "@yuuma (skirthike)",
      "@echj",
      "@dannex009",
      "@aurahack",
      "@sasaki mutsumi",
      "@darkmaya",
      "@rinotuna",
      "@nedia (nedia region)",
      "@bluefield",
      "@xingzhi lv",
      "@yaomai",
      "@beijuu",
      "@deco (geigeki honey)",
      "@cofffee",
      "@nakajima yuka",
      "@karutamo",
      "@masara (chuujou)",
      "@toraishi 666",
      "@mosha",
      "@mikoyan",
      "@nakahira guy",
      "@mashuu masaki",
      "@kupa (jesterwii)",
      "@ao banana",
      "@rin yuu",
      "@amagi (amagi626)",
      "@orizen",
      "@shnva",
      "@yu-ta",
      "@hellandheaven",
      "@yukichi (eikichi)",
      "@juurouta",
      "@jyt",
      "@nannacy7",
      "@yonedatomo mizu",
      "@ramudia (lamyun)",
      "@mawaru (mawaru)",
      "@kaetzchen",
      "@hiememiko",
      "@umishima senbon",
      "@akitetsu",
      "@fukidashi cotton",
      "@yoi naosuke",
      "@ukata",
      "@derauea",
      "@hxxg",
      "@anbe yoshirou",
      "@takaharu",
      "@onigirikun",
      "@mashima hiro",
      "@rui shi (rayze ray)",
      "@noripachi",
      "@camonome",
      "@nagami yuu",
      "@natsuya (kuttuki)",
      "@john doe (jdart)",
      "@ouma tokiichi",
      "@nakamura regura",
      "@ideolo",
      "@kotatsu (g-rough)",
      "@neko majin",
      "@yasuyuki",
      "@riz",
      "@kokudou juunigou",
      "@kunabishi",
      "@shimouki izui",
      "@ninai",
      "@crow (siranui)",
      "@ge-b",
      "@inanaki shiki",
      "@infukun",
      "@harano",
      "@guweiz",
      "@kanade (kanade 3344)",
      "@baba (baba seimaijo)",
      "@shibori kasu",
      "@oso (toolate)",
      "@yuri kyanon",
      "@kaiga",
      "@gazacy (dai)",
      "@homura subaru",
      "@shiratama (hockey)",
      "@hisasi",
      "@ashiomi masato",
      "@azumi (myameco)",
      "@zekkyon",
      "@gomtang",
      "@kaga3chi",
      "@twrlare",
      "@wool (miwol)",
      "@asakuraf",
      "@mondi hl",
      "@hizuki akira",
      "@hitotose rin",
      "@harimoji",
      "@saigado",
      "@mata (matasoup)",
      "@kenshin187",
      "@846-gou",
      "@akashio (loli ace)",
      "@nagase haruhito",
      "@teddypocky",
      "@rouka (akatyann)",
      "@ejami",
      "@sorani (kaeru0768)",
      "@ame.",
      "@bekkankou",
      "@monori rogue",
      "@shikushiku (amamori weekly)",
      "@sako (bosscoffee)",
      "@nakatani nio",
      "@kuena",
      "@genzoman",
      "@akara kai",
      "@mpien",
      "@nekoda (maoda)",
      "@sazanami mio",
      "@uni8",
      "@tab head",
      "@yuzuna99",
      "@sakaki imasato",
      "@ri-net",
      "@pottsness",
      "@naru (wish field)",
      "@ryo (tg290)",
      "@fukahire (ruinon)",
      "@jason (kaiten kussaku kikou)",
      "@kotochi re",
      "@yuto (dialique)",
      "@mayo riyo",
      "@yanagi (nurikoboshi)",
      "@cura",
      "@fathom",
      "@kamiyoshi rika",
      "@tony guisado",
      "@hajika",
      "@tatsumi ray",
      "@redcomet",
      "@shinshin",
      "@natsu (anta tte hitoha)",
      "@azusa (hws)",
      "@suminagashi",
      "@kamukamu (ars)",
      "@namauni",
      "@ishikkoro",
      "@wss (nicoseiga19993411)",
      "@hanasaka houcha",
      "@necro (nekurodayo)",
      "@akasaai",
      "@anmi",
      "@mitsurugi sugar",
      "@krekkov",
      "@yasume yukito",
      "@aoi nagisa (metalder)",
      "@pallad",
      "@piyokichi",
      "@wokada",
      "@saitou masatsugu",
      "@montemasa",
      "@tanaka ryou",
      "@shinoasa",
      "@nagioka",
      "@azuma aya",
      "@rei (sanbonzakura)",
      "@kamizono (spookyhouse)",
      "@misteor",
      "@shikito (yawa0w0)",
      "@azumi kazuki",
      "@icomochi",
      "@senomoto hisashi",
      "@hanekoto",
      "@hayashi custom",
      "@shirokuma a",
      "@yomosaka",
      "@kuro chairo no neko",
      "@arano oki",
      "@sugiyuu",
      "@shiroshi (denpa eshidan)",
      "@mochizuki kei",
      "@bococho",
      "@ohta yuichi",
      "@darjeeling (reley)",
      "@matanonki",
      "@korie riko",
      "@rifyu",
      "@zamius",
      "@gryebooks",
      "@uranaishi (miraura)",
      "@deetamu",
      "@shepherd0821",
      "@hyuuga azuri",
      "@stanley lau",
      "@cedar (cedar japonica)",
      "@suzunone rena",
      "@takaman (gaffe)",
      "@natsume eri",
      "@akeyama kitsune",
      "@itto (mentaiko)",
      "@hyde (tabakko)",
      "@greatmosu",
      "@edarow",
      "@zannen na hito",
      "@bunbun",
      "@kurona",
      "@miura-n315",
      "@kedama milk",
      "@yuzu momo",
      "@hounori",
      "@muchi maro",
      "@tamtamdi",
      "@aoki shizumi",
      "@fukai ryosuke",
      "@hxd",
      "@v-mag",
      "@timbougami",
      "@sonson (eleven)",
      "@kozaki yuusuke",
      "@fir3born",
      "@nishii (damnedrive)",
      "@noriuma",
      "@komori kuzuyu",
      "@nishimata aoi",
      "@takahashi kurage",
      "@kararage tsune",
      "@saipaco",
      "@tomu (tomubobu)",
      "@caryo",
      "@yadokari genpachirou",
      "@nuu (nu-nyu)",
      "@ryuu.",
      "@aki (neyuki41028)",
      "@kawai ritsu (rits meg)",
      "@mikazuki neko",
      "@lansane",
      "@komi zumiko",
      "@kannko bokujou",
      "@gishiki (gshk)",
      "@y2",
      "@mitarashi kousei",
      "@nekobungi sumire",
      "@hyurasan",
      "@kuroi mimei",
      "@yashin (yasinz)",
      "@kyogoku shin",
      "@kisaragi nana",
      "@sugano manami",
      "@krudears",
      "@kamishima kanon",
      "@gensoukoumuten",
      "@kurione (zassou)",
      "@sukja",
      "@op na yarou",
      "@huhi (huhi 1211)",
      "@nobita (makoto7060355)",
      "@ayakura juu",
      "@torimaru",
      "@doyouwantto",
      "@bae (baebae)",
      "@less",
      "@prywinko",
      "@goshiki suzu",
      "@koflif",
      "@chamaruk",
      "@nollety",
      "@sakuya tsuitachi",
      "@nameo (judgemasterkou)",
      "@pan (mimi)",
      "@mocha (cotton)",
      "@migolu",
      "@midorikawa you",
      "@uni mate",
      "@efe",
      "@6u (eternal land)",
      "@free style (yohan1754)",
      "@aoi kumiko",
      "@nyuu (manekin-eko)",
      "@toutenkou",
      "@tanashi (mk2)",
      "@mochirong",
      "@synecdoche",
      "@kei (keigarou)",
      "@yoshitomi akihito",
      "@redi (rasec asdjh)",
      "@zuwai kani",
      "@rakeemspoon",
      "@shone",
      "@shima (wansyon144)",
      "@inkerton-kun",
      "@machi (machi0910)",
      "@fuukadia (narcolepsy)",
      "@cafekun",
      "@kawai (purplrpouni)",
      "@konishi (koconatu)",
      "@ebiblue",
      "@gin'ichi (akacia)",
      "@weee (raemz)",
      "@necomi",
      "@j7w",
      "@teoi (good chaos)",
      "@narumi arata",
      "@hiiragi yuuichi",
      "@gomulgong",
      "@misaki nonaka",
      "@sankuma",
      "@monikano",
      "@kamezaemon",
      "@minust",
      "@kikurage (crayon arts)",
      "@ysys",
      "@newo (shinra-p)",
      "@kelvin hiu",
      "@molu stranger",
      "@imoko (imonatsuki)",
      "@kozue akari",
      "@mikazuchi zeus",
      "@kousaki rui",
      "@hu dako",
      "@pudgeruffian",
      "@tajima yuuki",
      "@dsmile",
      "@shika miso",
      "@amane hasuhito",
      "@ponzu rui",
      "@blvefo9",
      "@clamp (circle)",
      "@toujou sakana",
      "@elfenlied22",
      "@hima",
      "@soranamae",
      "@hi you (flying bear)",
      "@vamos mk",
      "@mu46016419",
      "@duke (inu daimyou)",
      "@alphonse (white datura)",
      "@ayagi daifuku",
      "@qiandaiyiyu",
      "@dr.p",
      "@kikumaru bunta",
      "@ganesagi",
      "@tomobe kinuko",
      "@namamo nanase",
      "@mafuyu (chibi21)",
      "@harris hero",
      "@roki (hirokix)",
      "@ekz (robotekz)",
      "@nigo (aozoragarou)",
      "@yonu (yonurime)",
      "@a-ka",
      "@bluethebone",
      "@honjou raita",
      "@babalilo",
      "@advarcher",
      "@otoi rekomaru",
      "@hisen kaede",
      "@kotobuki (momoko factory)",
      "@binsen",
      "@ichihaya",
      "@namie-kun",
      "@matilda fiship",
      "@gemu555",
      "@kojima takeshi",
      "@festa11307070",
      "@vertigris",
      "@marukyuu ameya",
      "@dede (qwea 00000)",
      "@murata tefu",
      "@inoue sora",
      "@nitamako (sakamalh)",
      "@itou (onsoku tassha)",
      "@shpo",
      "@yayoi maka",
      "@fuuma nagi",
      "@tenmaso",
      "@kurotofu",
      "@bellhenge",
      "@emily (pure dream)",
      "@omaru gyuunyuu",
      "@walzrj",
      "@redlhzz",
      "@kurot",
      "@sirokuma shake",
      "@noco (adamas)",
      "@csyday",
      "@maco22",
      "@akadako",
      "@kanmiya shinobu",
      "@oda ken'ichi",
      "@anato finnstark",
      "@haru (konomi 150)",
      "@misaka 12003-gou",
      "@jeneral",
      "@osakana (denpa yun'yun)",
      "@emurin",
      "@mvv",
      "@seiran (mousouchiku)",
      "@muk (monsieur)",
      "@nekono matatabi",
      "@toritora",
      "@ng1sh8",
      "@takeshima eku",
      "@pigeon666",
      "@zerocat",
      "@akagi kurage",
      "@aningay",
      "@quick waipa",
      "@luicent",
      "@t1kosewad",
      "@koi (koisan)",
      "@araneesama",
      "@hijiri rei",
      "@eichi yuu",
      "@super masara",
      "@sachito",
      "@amagai tarou",
      "@haruri",
      "@kawase seiki",
      "@kanniiepan",
      "@chameleon (ryokucha combo)",
      "@chihiro (kemonomichi)",
      "@fun bo",
      "@tsukasawa takamatsu",
      "@momose (oqo)",
      "@hidari (left side)",
      "@shikitani asuka",
      "@suurin (ksyaro)",
      "@kekemotsu",
      "@taira yuuki",
      "@zaphn",
      "@kouda suzu",
      "@terrajin",
      "@souryu",
      "@muku (muku-coffee)",
      "@yuiga naoha",
      "@doushimasho",
      "@skeptycally",
      "@ryuki (ryukisukune)",
      "@ssalbulre",
      "@daaku (koizumi arata)",
      "@yumesato makura",
      "@ekrea jan",
      "@koyubi (littlefinger1988)",
      "@shibafu (glock23)",
      "@totatokeke",
      "@munakata (sekimizu kazuki)",
      "@possummachine",
      "@poprication",
      "@chiimako",
      "@azuki osamitsu",
      "@tajima ryuushi",
      "@suwaneko",
      "@shiina excel",
      "@saiste",
      "@lainart",
      "@amano kouki",
      "@hatsunatsu",
      "@ginko (silver fox)",
      "@kutsuki kai",
      "@ddolbang",
      "@shingyou (alexander-13)",
      "@himura moritaka",
      "@aosora2823",
      "@takatsuki nato",
      "@masakichi (crossroad)",
      "@haguhagu (rinjuu circus)",
      "@reku",
      "@kinona",
      "@onsen tamago (hs egg)",
      "@nekoume",
      "@tebi (tbd11)",
      "@isaki (gomi)",
      "@baileys (tranquillity650)",
      "@ryosios",
      "@fumitsuki (minaduki 6)",
      "@han (jackpot)",
      "@yakisobapan tarou & negitoro-ko",
      "@watanon (gakushokutei)",
      "@blue borscht",
      "@toka (marchlizard)",
      "@marota",
      "@qys3",
      "@katou shinobu",
      "@kikuyoshi (tracco)",
      "@kazuma (kazumav)",
      "@nploser",
      "@yano mitsuki (nanairo)",
      "@inuinui",
      "@yutakasan-love",
      "@chipa (arutana)",
      "@chyko",
      "@kuromayu",
      "@ica",
      "@non (kumakawayusu)",
      "@kirero",
      "@taishi (picchiridou)",
      "@roropull",
      "@dasdokter",
      "@kuya (hey36253625)",
      "@nishihara isao",
      "@gabiran",
      "@shiki (psychedelic g2)",
      "@kyo (kuroichigo)",
      "@butterchalk",
      "@zasshu",
      "@ran'ou (tamago no kimi)",
      "@puuzaki puuna",
      "@yasaikakiage",
      "@lee (colt)",
      "@hidulume",
      "@ask (askzy)",
      "@h kasei",
      "@yuuki rika",
      "@rune (dualhart)",
      "@freng",
      "@onono imoko",
      "@tiemu (man190)",
      "@hakusai (tiahszld)",
      "@enjaku izuku",
      "@kanno takanori",
      "@geshumaro",
      "@asahina yoshitoshi",
      "@yapo (croquis side)",
      "@miri (ago550421)",
      "@tsubobot",
      "@ougi hina",
      "@mitha",
      "@tonarikeru",
      "@gachou",
      "@yoru nai",
      "@okpriko",
      "@nakabayashi zun",
      "@tomari (veryberry00)",
      "@kajin (kajinman)",
      "@tro (trombe)",
      "@squeezable (squeezabledraws)",
      "@tomohiro kai",
      "@hwansang",
      "@takase muh",
      "@mochizuki shiina",
      "@60mai",
      "@nikki kyousuke",
      "@shellvi",
      "@pairan",
      "@squchan",
      "@shirako (kirupi)",
      "@hanpenmaru",
      "@sazanami konami",
      "@kadose ara",
      "@ai takurou",
      "@yamada rei (rou)",
      "@taka (takahirokun)",
      "@matsuda yuusuke",
      "@kuro (toi et moi)",
      "@mizikayo",
      "@dan (kumadan)",
      "@torako (toramaru)",
      "@silly (marinkomoe)",
      "@idkuroi",
      "@kasai shin",
      "@kakizaki (chou neji)",
      "@fi-san",
      "@ainy",
      "@betabeet",
      "@narue",
      "@echo saber",
      "@mirin chikuwa",
      "@atg (wttoo0202)",
      "@sankakusui",
      "@toshishikisai",
      "@miwabe sakura",
      "@saitou naoki",
      "@boppin",
      "@sseopik",
      "@zunkome",
      "@lockheart",
      "@okitakung",
      "@paragasu (parags112)",
      "@hanauna",
      "@janong",
      "@takanashi ringo",
      "@eufoniuz",
      "@lunacle",
      "@fjsmu",
      "@tsukui kachou",
      "@tamago (yotsumi works)",
      "@miko (royal milk)",
      "@melowh",
      "@vilde loh hocen",
      "@yakihebi",
      "@zaxwu",
      "@yuugen",
      "@gibun (sozoshu)",
      "@abandon ranka",
      "@tksand",
      "@nia (nia4294)",
      "@haneru",
      "@okiraku nikku",
      "@fuuen (akagaminanoka)",
      "@shinozuka jouji",
      "@matsuo yukihiro",
      "@sasaame",
      "@kuroi suna",
      "@neit ni sei",
      "@meth (emethmeth)",
      "@hood (james x)",
      "@the golden smurf",
      "@mr.romance",
      "@shin'yashiki",
      "@takayama toshinori",
      "@rosuuri",
      "@somebody (leiking00)",
      "@lillly",
      "@hokuro ryuuseigun",
      "@yajirushi (chanoma)",
      "@komakoma (magicaltale)",
      "@miya (miyaruta)",
      "@naokomama",
      "@kajimakoto",
      "@kadeart",
      "@uneg",
      "@nilitsu",
      "@mimimi (mimimim9999)",
      "@piyodera mucha",
      "@shiwasu no okina",
      "@cloba",
      "@amano don",
      "@katagiri hachigou",
      "@madcocoon",
      "@ouno (nounai disintegration)",
      "@piripun",
      "@meis (terameisu)",
      "@kamiya tomoe",
      "@nanashino",
      "@niina ryou",
      "@coro fae",
      "@jonsun",
      "@teshima nari",
      "@kimura takahiro",
      "@nikoo",
      "@sora 72-iro",
      "@amisu",
      "@shouji nigou",
      "@nakayama miyuki",
      "@ajishio",
      "@sapphire (nine)",
      "@shiwasu horio",
      "@coffeekite",
      "@yan (nicknikg)",
      "@sawao",
      "@dora ita",
      "@usa37107692",
      "@bigkwl",
      "@noah (tettsui-sole)",
      "@shabana may",
      "@mirai hikari",
      "@christian young",
      "@habsida (habsida hpy)",
      "@taikyoku tsurugi",
      "@gabriel evangel",
      "@kiikii (kitsukedokoro)",
      "@yae (mono110)",
      "@suke (singekijyosei)",
      "@ayakashi (monkeypanch)",
      "@dino (dinoartforame)",
      "@ohasi",
      "@yumiya",
      "@iwamoto eiri",
      "@batta (ijigen debris)",
      "@mujinbensin",
      "@hanabusaoekaki",
      "@xter",
      "@tukino neru",
      "@sameha ikuya",
      "@tsukudani norio",
      "@redjet",
      "@missile228",
      "@andou shuki",
      "@takunomi",
      "@utsusumi kio",
      "@fagi (kakikaki)",
      "@speedl00ver",
      "@kanden sky",
      "@simoyuki",
      "@peso (cheese company)",
      "@rento (rukeai)",
      "@akino sora",
      "@peroponesosu.",
      "@nonono mino",
      "@torino aqua",
      "@tateha (marvelous grace)",
      "@goback",
      "@cocoballking",
      "@misekai 555",
      "@kibisake",
      "@hiraga matsuri",
      "@papajay (jennygin2)",
      "@tonpuu",
      "@miyako hito",
      "@kurashima tomoyasu",
      "@mumyou ishi",
      "@yudepii",
      "@hero neisan",
      "@terada tera",
      "@koyomania",
      "@sadamoto yoshiyuki",
      "@kugimiya atsuki",
      "@hosizora mikoto",
      "@kakage",
      "@segami daisuke",
      "@uenoryoma",
      "@momoshiki tsubaki",
      "@shigatake",
      "@tokita (jyabarachan)",
      "@nanase miori",
      "@sido (slipknot)",
      "@puddinghomhom",
      "@kanzarin",
      "@izumi sai",
      "@po-ju",
      "@okota mikan",
      "@suito",
      "@yamanashi taiki",
      "@giraffe (ilconte)",
      "@alex ahad",
      "@abara heiki",
      "@poyo (hellmayuge)",
      "@randomboobguy",
      "@shiro9jira",
      "@illu (illu stratos)",
      "@ittla",
      "@suruga (xsurugax)",
      "@combos & doodles",
      "@koume keito",
      "@takepoison",
      "@kerorira",
      "@shintarou",
      "@konshin",
      "@ham (points)",
      "@mitsumomo mamu",
      "@chiwino",
      "@kita senri",
      "@sakura yuki (clochette)",
      "@henshako",
      "@dars (recolors)",
      "@akatsuki hijiri",
      "@kyuuba melo",
      "@mleth",
      "@siirakannu",
      "@dorontabi",
      "@ugatsu matsuki",
      "@nekobaka",
      "@sempon (doppio note)",
      "@dakku (ogitsune)",
      "@kurata rine",
      "@laserflip",
      "@okuri banto",
      "@kokone (coconeeeco)",
      "@noya makoto",
      "@naso4",
      "@takitarou",
      "@ormille",
      "@kayabakoro",
      "@tsukumiya amane",
      "@chahan (fried rice0614)",
      "@akou roushi",
      "@gsusart",
      "@yuuka nonoko",
      "@yamamomo (plank)",
      "@akashieru",
      "@tsubasa (abchipika)",
      "@tyomimas",
      "@murabito c",
      "@yuuki tatsuya",
      "@gaston18",
      "@subachi",
      "@momisan",
      "@kurotama",
      "@shennai misha",
      "@nyama",
      "@kso",
      "@ryo (botugo)",
      "@btmr game",
      "@gearous",
      "@ken (koala)",
      "@iroyopon",
      "@ji no",
      "@kujou ichiso",
      "@rucchiifu",
      "@kaminagi (kaminagi-tei)",
      "@jill 07km",
      "@muku jirushi",
      "@jasony",
      "@daive",
      "@suo bu ye feng",
      "@soejima shigenori",
      "@amazuki jou",
      "@eko",
      "@mi taro333",
      "@otosama",
      "@minashirazu",
      "@negresco",
      "@risui (suzu rks)",
      "@ro g (oowack)",
      "@mitsuba choco",
      "@yoban",
      "@fujikawa",
      "@yuano",
      "@metata",
      "@oosaka kanagawa",
      "@beifeng han",
      "@akiyama enma",
      "@asa no ha (awayuki)",
      "@manino (mofuritaionaka)",
      "@feguimel",
      "@asanagi shion",
      "@saraki",
      "@centurii-chan",
      "@mappaninatta",
      "@harumina mau",
      "@boshi (a-ieba)",
      "@kurasuke",
      "@tokkyu",
      "@namiorii",
      "@osananajimi neko",
      "@mobu",
      "@onyhakase",
      "@kurihara sakura",
      "@butter-t",
      "@henria",
      "@kirigakure (kirigakure tantei jimusho)",
      "@chinomaron",
      "@tenako (mugu77)",
      "@parari (parari000)",
      "@ironlily",
      "@ruton-niki",
      "@sasanon (sasapoliton)",
      "@akisora",
      "@morii shizuki",
      "@lazyprocrastinator",
      "@sasamori tomoe",
      "@hayashi kewi",
      "@lazyartlazy12",
      "@tusia",
      "@rasukaru",
      "@medu (rubish)",
      "@kkopoli",
      "@gorgeous mushroom",
      "@miyama-zero",
      "@mdf an",
      "@norza",
      "@shin'ya (shin'yanchi)",
      "@monobe yuri",
      "@junsuina fujunbutsu",
      "@sakuraba hikaru (loveindog)",
      "@norizou type-r",
      "@klaius",
      "@suiren yurei",
      "@jourd4n",
      "@hoshimiya aki",
      "@yoruny",
      "@maze (gochama ze gohan)",
      "@jiji (aardvark)",
      "@tokiani",
      "@azuuru",
      "@yujup",
      "@yumaru (marumarumaru)",
      "@cirenk",
      "@yoshizawa tsubaki",
      "@yuzuno nana",
      "@blacksaikou",
      "@imazon",
      "@haruakira",
      "@hikage eiji",
      "@baku-p",
      "@feint721",
      "@akagi (fmttps)",
      "@naoki (2rzmcaizerails6)",
      "@goe (g-o-e)",
      "@pettan p",
      "@yuumei",
      "@tokuura",
      "@megadeko",
      "@okuda yasuhiro",
      "@masanaga (tsukasa)",
      "@kiira",
      "@kuroi (liar-player)",
      "@ogipote",
      "@oda non",
      "@sakuramochi (sakura frappe)",
      "@minarai",
      "@yoshida hideyuki",
      "@ume (plumblossom)",
      "@sunaba suzume",
      "@hamada yoshikazu",
      "@blue-senpai",
      "@sakura hiyori",
      "@kink (tortoiseshell)",
      "@yachima tana",
      "@wahiko (black bastard)",
      "@flipper",
      "@miazi",
      "@z.taiga",
      "@puchiman",
      "@gar32",
      "@tomokichi",
      "@ratatatat74",
      "@yusha m",
      "@wakamatsu372",
      "@nakkar",
      "@tilt-shift (azalanz)",
      "@miwano rag",
      "@jema",
      "@yoshioka yoshiko",
      "@kotoribako",
      "@sesield",
      "@fujitaka nasu",
      "@san-pon",
      "@mitsuba minoru",
      "@efukei",
      "@tsubasa tsubasa",
      "@dantewontdie",
      "@pokachu",
      "@daichi (tokoya)",
      "@hamaken. (novelize)",
      "@moketa",
      "@silver (chenwen)",
      "@pixie willow (voice actor)",
      "@takahero",
      "@ree (re-19)",
      "@f.s.",
      "@hanato (seonoaiko)",
      "@jun (aousa0328)",
      "@yuizaki kazuya",
      "@yamasan",
      "@keuma",
      "@softmode",
      "@matsumoto tomoyohi",
      "@shokuyou mogura",
      "@naruse mai",
      "@gengorou",
      "@kakone",
      "@koumei (twinameless)",
      "@sakayama shinta",
      "@snegovski",
      "@torichamaru",
      "@batta 16-sei",
      "@deras",
      "@wada kazu",
      "@houzuki (hotondo)",
      "@scott malin",
      "@tarakanovich",
      "@task (s task80)",
      "@lala (sputnik)",
      "@niiya",
      "@shigure ryuunosuke",
      "@ookuma nekosuke",
      "@tsuzuri (tuzuri)",
      "@erkaz",
      "@kippu",
      "@shamakho",
      "@radish p",
      "@sabamen",
      "@shimejinameko",
      "@aroma sensei",
      "@blazpu",
      "@hachiko (hati12)",
      "@a.x.",
      "@skai kun",
      "@valtor",
      "@makacoon",
      "@damda",
      "@loliconder",
      "@re:shimashima",
      "@kitaku (nakamachi machi)",
      "@azuma meri",
      "@usoneko",
      "@asiri senpai",
      "@yamashita takahiro",
      "@atahuta",
      "@suzutsuki kurara",
      "@huyandere",
      "@swkl:d",
      "@naegi (naegidokoro)",
      "@shiraha maru",
      "@ryota (ry o ta)",
      "@aria (koiiroharemoyou)",
      "@kurone rinka",
      "@yuu (higashi no penguin)",
      "@sei shoujo",
      "@cheer (cheerpuppy14)",
      "@satou atsuki",
      "@kawachi koorogi",
      "@abo (hechouchou)",
      "@trefle r",
      "@yukie (peach candy)",
      "@offbeat",
      "@shunichi",
      "@yajuu",
      "@ninoko",
      "@takatisakana",
      "@jagaimo (kkamja)",
      "@mimikaki (men bow)",
      "@nikichen",
      "@tokyo (great akuta)",
      "@cessa",
      "@goyain",
      "@kiryu manzoku",
      "@nichika (nitikapo)",
      "@saburou (hgmg)",
      "@0lightsource",
      "@capura lin",
      "@atte nanakusa",
      "@wsman",
      "@sw (taco)",
      "@demizu posuka",
      "@chigasaki yukari",
      "@gouta (nagishiro6624)",
      "@nakamura yukitoshi",
      "@baba arumi",
      "@myama",
      "@lzh",
      "@gia",
      "@imaichi",
      "@kochiya (gothope)",
      "@popopoka",
      "@ramanda",
      "@artsy-rc",
      "@arthur ko",
      "@nagasioo",
      "@umyonge (lkakeu)",
      "@tomozero",
      "@sh (shinh)",
      "@yuran",
      "@hanpetos",
      "@hirunagi",
      "@sankuro (agoitei)",
      "@akatsuki akane",
      "@rea loixacra",
      "@toudori",
      "@eho (icbm)",
      "@ryuuzaki ichi",
      "@kurachi mizuki",
      "@namonashi",
      "@shuga (soranote)",
      "@aomushi (mushamusha)",
      "@moral cacoethes",
      "@gogalking",
      "@noumen",
      "@kamonari ahiru",
      "@kokomi (aniesuakkaman)",
      "@fuchi (nightmare)",
      "@sage joh",
      "@ao usagi",
      "@shan",
      "@asyura kumo",
      "@kinta (distortion)",
      "@apios",
      "@xiaoxi0619",
      "@kanzaki hiro",
      "@mashiro aa",
      "@mitsu (mitsu art)",
      "@difman",
      "@mizuga",
      "@hibana (hibana ztlv)",
      "@haniwa (leaf garden)",
      "@wanaata",
      "@ikemeru19",
      "@yukiwo",
      "@ukokkei",
      "@himitsu (hi mi tsu 2)",
      "@shiokonbu",
      "@maccha (mochancc)",
      "@kukumomo",
      "@iroiro yaru hito",
      "@shakemi (sake mgmgmg)",
      "@kabuyama kaigi",
      "@chiharu (9654784)",
      "@chima q",
      "@n9at",
      "@mocchi (mocchichani)",
      "@chikado",
      "@masuishi kinoto",
      "@ryogo",
      "@matrix16",
      "@ponponmaru",
      "@iwao178",
      "@hijiri (resetter)",
      "@yana (nekoarashi)",
      "@k mugura",
      "@weno",
      "@buriki",
      "@eiwa",
      "@shirogane (platinum)",
      "@deku suke",
      "@marumoru",
      "@fengling (furin-jp)",
      "@suzushiro kurumi",
      "@emyo",
      "@kkato",
      "@kuboken",
      "@lumo 1121",
      "@muu (mumumer)",
      "@makihitsuji",
      "@robo mikan",
      "@neropaso",
      "@langbazi",
      "@naozuri",
      "@j@ck",
      "@bengus",
      "@zakusi",
      "@reeh (yukuri130)",
      "@oda takayuki",
      "@tokunou shoutarou",
      "@saku (kudrove)",
      "@mizuki maya",
      "@sugue tettou",
      "@fluffydango",
      "@colo (nagrolaz)",
      "@nyoro (nyoronyoro000)",
      "@somechime (sometime1209)",
      "@core (mayomayo)",
      "@redjuice",
      "@faustsketcher",
      "@sixten",
      "@mao lian (nekokao)",
      "@nuezou",
      "@ahenn",
      "@shift (waage)",
      "@jigatei (omijin)",
      "@nakano maru",
      "@regular mow",
      "@tachimi (basue)",
      "@tyako 089",
      "@navy (navy.blue)",
      "@sasayuki",
      "@yamasaki wataru",
      "@alexmaster",
      "@ataru (ataru-littlebird)",
      "@mumu (mumunyan)",
      "@fuyumi kazuki",
      "@yamanokami eaka",
      "@jony (avion mura)",
      "@nekomata naomi",
      "@edobox",
      "@meecosme",
      "@ameto yuki",
      "@miyasu risa",
      "@greatodoggo",
      "@gustav (telomere na)",
      "@miyamoto issa",
      "@helloimtea",
      "@tenten (chan4545)",
      "@koh (minagi kou)",
      "@piyodesu",
      "@tappa (esperanza)",
      "@izumi mahiru",
      "@tsurusaki takahiro",
      "@parororo",
      "@maruto (marutohonpo)",
      "@e volution",
      "@nasuno (nasuno42)",
      "@rkrk",
      "@hitomaru",
      "@marugoshi teppei",
      "@koretsuki azuma",
      "@amashiro natsuki",
      "@guchico",
      "@sunna (nilsunna)",
      "@thomasz",
      "@beudelb",
      "@ikeda jun (mizutamari)",
      "@ayato",
      "@hinata yuu",
      "@amonitto",
      "@jilu",
      "@tsuruyama (tenten)",
      "@muromaki",
      "@limgae",
      "@hato haru",
      "@spindle (aidenr0)",
      "@baretto (karasi07)",
      "@box wonderland",
      "@kinoshita ichi",
      "@l hakase",
      "@tsukemon",
      "@disco brando",
      "@takemura sessyu",
      "@kei (soundcross)",
      "@chups",
      "@mana (remana)",
      "@rekaerb maerd",
      "@judo fuu",
      "@nabeshima tetsuhiro",
      "@yu yu",
      "@tobi (one)",
      "@monrooru",
      "@azuma yuki",
      "@shamo (koumakantv)",
      "@muryotaro",
      "@shounen (hogehoge)",
      "@mac star",
      "@e10",
      "@7saki",
      "@selcky",
      "@gunp",
      "@yuihico",
      "@chocolat (momoiro piano)",
      "@kohsaka jun",
      "@birii",
      "@moonlight 0423",
      "@bonkara (sokuseki maou)",
      "@mame1645",
      "@deego (omochi bazooka)",
      "@sen (sansui)",
      "@buran buta",
      "@mikagami sou",
      "@biyon",
      "@ina (gokihoihoi)",
      "@feral lemma",
      "@aelion draws",
      "@alakoala",
      "@iwasi 29",
      "@shichigatsu",
      "@kuresento",
      "@kishiyo",
      "@ponytail korosuke",
      "@raika9",
      "@nekoguruma",
      "@mirei",
      "@choco chip",
      "@gokuu (acoloredpencil)",
      "@hane yuki",
      "@sukage",
      "@yamada (gotyui)",
      "@tsurukame",
      "@nucomas",
      "@kedamono kangoku-tou",
      "@sparrowl",
      "@tachitsu teto",
      "@xiacheng tatsuya",
      "@komori kei",
      "@dolustoy",
      "@mil (xration)",
      "@djheycha",
      "@nodachi (nodati51)",
      "@hoshino ouka",
      "@m&m (mickey and mackey)",
      "@magister",
      "@na-suke",
      "@glitchedpuppet",
      "@nikaidou kou",
      "@nagayori",
      "@hyakumangoku masurao",
      "@nat the lich",
      "@nullma",
      "@sawayaka samehada",
      "@lk149",
      "@eisu (eith)",
      "@tadano magu",
      "@daydarion",
      "@midnight (banyex)",
      "@asada hachi",
      "@hitec",
      "@rohitsuka",
      "@magion02",
      "@umikochannart",
      "@errant",
      "@kaname aomame",
      "@takashia (akimototakashia)",
      "@testa",
      "@sam yang",
      "@atelier-moo",
      "@kuroi susumu",
      "@mitsugu",
      "@mito (go!go!king!)",
      "@noshimurin",
      "@hagure kedama",
      "@sakizaki saki-p",
      "@akitokage",
      "@kitajima yuuki",
      "@huanxiang heitu",
      "@kalmahul",
      "@serizawa (serizawaroom)",
      "@raine (acke2445)",
      "@torii sumi",
      "@hans.b",
      "@shingyouji tatsuya",
      "@sorai shin'ya",
      "@pop (electromagneticwave)",
      "@dyson (edaokunnsaikouya)",
      "@sekira ame",
      "@tea (nakenashi)",
      "@naruko hanaharu",
      "@takeda hiromitsu",
      "@shikei",
      "@syunzou",
      "@kakao (chocolate land)",
      "@tamayan",
      "@kuronuko neero",
      "@amania orz",
      "@houraku",
      "@wacchi",
      "@cccpo",
      "@pikaole",
      "@zuizi",
      "@yuzuki gao",
      "@makoto daikichi",
      "@r-binon",
      "@kairakuen umenoka",
      "@rnna",
      "@super zombie",
      "@gin'you haru",
      "@niku (ni23ku)",
      "@easonx",
      "@orinze",
      "@branch (blackrabbits)",
      "@meiji ken",
      "@naoto (tulip)",
      "@hakika",
      "@makio (makiomeigenbot)",
      "@ks (xephyrks)",
      "@nopetroto",
      "@okama",
      "@arim0k0",
      "@neko neko koneko",
      "@neco",
      "@warashi",
      "@tadano kagekichi",
      "@tinker bell (pixiv 10956015)",
      "@ichiyou moka",
      "@remsrar",
      "@kazenoko",
      "@min (myna8247)",
      "@natsu no koucha",
      "@kaho 0102",
      "@zd (pixiv6210083)",
      "@ehrrr",
      "@nashidrop",
      "@watanabe yoshihiro",
      "@pizza (pizzania company)",
      "@calin",
      "@suien",
      "@sakuragi ren",
      "@fukuro (maruaru00)",
      "@daimaou ruaeru",
      "@47agdragon",
      "@silverxp",
      "@yutazou",
      "@try (lsc)",
      "@tenchisouha",
      "@fakepucco",
      "@guriguri (arayotto4351)",
      "@tsuki tokage",
      "@aduti momoyama",
      "@tenjin hidetaka",
      "@suzuho hotaru",
      "@hashira 14",
      "@kame (3t)",
      "@nekomamire",
      "@shin'ya (nanp)",
      "@noyama takenoko",
      "@kl (dgzonbi)",
      "@chicago-x",
      "@marushin (denwa0214)",
      "@herohero (higashi no dou)",
      "@sato ame",
      "@kibihimi",
      "@kodachi (kuroyuri shoukougun)",
      "@takehana note",
      "@nenobi (nenorium)",
      "@c (theta)",
      "@yun cao bing",
      "@ayasugi tsubaki",
      "@kuppipi ramutarou",
      "@yetworldview kaze",
      "@kanzaki muyu",
      "@massala",
      "@satsumapotato",
      "@rourou (been)",
      "@yuuyu (777)",
      "@oldsickkim",
      "@coubalty",
      "@urutsu sahari",
      "@ereka",
      "@shirokitsune",
      "@kamioka shun'ya",
      "@mountain han",
      "@hanada yanochi",
      "@hatori mia",
      "@ast",
      "@isegawa yasutaka",
      "@enpe",
      "@s-a-murai",
      "@uenomigi",
      "@kokuzou",
      "@nonaka ritsu",
      "@wanimaru",
      "@classic (zildjian33)",
      "@qosic",
      "@comah",
      "@kienbiu",
      "@lm7 (op-center)",
      "@ikegami akane",
      "@ka (996beshi)",
      "@mofu namako",
      "@kawagishi keitarou",
      "@wataame27",
      "@kotatu (akaki01aoki00)",
      "@nakamura hinato",
      "@utsurogi angu",
      "@abazu-red",
      "@kagami uekusa",
      "@haruki (colorful macaron)",
      "@sekai saisoku no panda",
      "@sarukaiwolf",
      "@haganef",
      "@n:go",
      "@shimadoriru",
      "@sumisu (mondo)",
      "@akai sashimi",
      "@shizuma yoshinori",
      "@mura karuki",
      "@homunculus (alchemynote)",
      "@ikazu401",
      "@itsuka neru",
      "@shougun (chuckni1)",
      "@hachi (chihagura)",
      "@caidychen",
      "@sukemyon",
      "@senju (snz0)",
      "@momendoufu",
      "@todding",
      "@tabigarasu",
      "@woofycakes",
      "@saku anna",
      "@hazuki (nyorosuke)",
      "@ruri rarako",
      "@tomajiyama",
      "@youta",
      "@kawacy",
      "@c-button",
      "@waligner",
      "@cross (crossryou)",
      "@vihua6",
      "@sakurai makoto (custom size)",
      "@amasawa natsuhisa",
      "@pako (pousse-cafe)",
      "@kamo kamen",
      "@mel/a",
      "@saku (osake love)",
      "@s4ika",
      "@dema hmw",
      "@anonymous (japanese)",
      "@flasher (flasher ura)",
      "@ubanis",
      "@pinta (ayashii bochi)",
      "@hioyami",
      "@panqlao",
      "@3 small spiders",
      "@nanohana (november.)",
      "@ebizome",
      "@chihunhentai",
      "@ebifly",
      "@inugami kira",
      "@kinocopro",
      "@dra (area-s)",
      "@niwatori kokezou",
      "@tokumi yuiko",
      "@nav (itsnav)",
      "@eggman (ni tamagoex)",
      "@maeshima shigeki",
      "@samidare (hoshi)",
      "@erica (naze1940)",
      "@leonat",
      "@nishizawa",
      "@mataichi mataro",
      "@poco (asahi age)",
      "@chuunioniika",
      "@kyuu (plastic night q)",
      "@pepper0",
      "@kannatsuki noboru",
      "@niko (tama)",
      "@chata maru (irori sabou)",
      "@kaguyuzu",
      "@mizuki (flowerlanguage)",
      "@zawameki",
      "@egami",
      "@vivinos",
      "@shun (rokudena-shi)",
      "@takemori shintarou",
      "@kisairo kaede",
      "@mogu (au1127)",
      "@ebihara beniko",
      "@mike inel",
      "@negi (ulog'be)",
      "@fujishima shinnosuke",
      "@takaya n",
      "@mukka",
      "@megahiyo",
      "@tachibana roku",
      "@baram",
      "@inuno rakugaki",
      "@kutone shirika",
      "@some1else45",
      "@raiou",
      "@snm (sunimi)",
      "@clear glass (mildmild1311)",
      "@trente",
      "@horuhara",
      "@kafu (logaemon)",
      "@shundou heishirou",
      "@hi (ibisf5umauma)",
      "@kaoling",
      "@zurikishi",
      "@kouda tomohiro",
      "@sho-n-d",
      "@tokonone",
      "@kilesha",
      "@beeeeen",
      "@kutabireta neko",
      "@k0ng",
      "@magowasabi",
      "@sanshoku amido",
      "@pizzasi",
      "@karamoneeze",
      "@aoi ogata",
      "@retsumaru",
      "@kaos art",
      "@amog",
      "@ayuma sayu",
      "@menyoujan",
      "@siraha",
      "@bae.c",
      "@ry (yagoyago)",
      "@mochiyuki",
      "@pandea work",
      "@panties (pantsu-pirate)",
      "@dismaiden",
      "@swav",
      "@kanaria hisagi",
      "@sasai saji",
      "@achiki",
      "@dodai shouji",
      "@shouji ayumu",
      "@kanna (plum)",
      "@murata yuusuke",
      "@tetsurou (fe+)",
      "@danimaru",
      "@haruyuki (gffewuoutgblubh)",
      "@nagu",
      "@shirogane hina",
      "@love cacao",
      "@nakamura takeshi",
      "@suichuu hanabi",
      "@na tarapisu153",
      "@shitacemayo",
      "@mizuta kenji",
      "@sbs",
      "@kokihanada",
      "@techi (techi35499)",
      "@amane ruri",
      "@gin00",
      "@nishizuki shino",
      "@chocomiru",
      "@pupps",
      "@hashi",
      "@gentle sasaki",
      "@r3dfive",
      "@luminyu",
      "@hsin",
      "@ninimo nimo",
      "@kobamiso (kobalt)",
      "@kisaragi kaya",
      "@takamine nadare",
      "@gatchan",
      "@aak",
      "@zenshin",
      "@hiiragi hazime",
      "@mabing",
      "@marimo danshaku",
      "@leon (mikiri hassha)",
      "@ringo sui",
      "@rasusurasu",
      "@huanxiang huifeng",
      "@ryeon (naturesan)",
      "@ponpu (pumpkinsinclair)",
      "@naufaldreamer",
      "@solar (happymonk)",
      "@yourfreakyneighbourh",
      "@furau",
      "@sakai kyuuta",
      "@harunatsu akito",
      "@kuuchuu yousai",
      "@hayama eishi",
      "@z-epto (chat-noir86)",
      "@shinanoya (satanicad)",
      "@shiitake taishi",
      "@karasusou nano",
      "@accio",
      "@dandara (karakure)",
      "@d-m (dii emu)",
      "@caburi",
      "@sun iiinu",
      "@mm (mm chair)",
      "@mizunashi (second run)",
      "@masa masa",
      "@kisaragi yuu (fallen sky)",
      "@aumann",
      "@batrobin k",
      "@wata (attaka towel)",
      "@purin jiisan",
      "@urabi (tomatohouse)",
      "@nekoshoko",
      "@okitsugu",
      "@myusha",
      "@amedamacon",
      "@piukute062",
      "@mizutama",
      "@noto kurumi",
      "@yoshida keiji",
      "@o (rakkasei)",
      "@shu-mai",
      "@inudori",
      "@bakkanki",
      "@shirotategosha",
      "@nez-box",
      "@kusano (torisukerabasu)",
      "@tokoroten (hmmuk)",
      "@shiba itsuki",
      "@arutera",
      "@inoshira",
      "@leonmandala",
      "@koahri",
      "@ko yu",
      "@shinmai (kyata)",
      "@igayan",
      "@satoupote",
      "@tsuutenkaaku",
      "@cyicheng",
      "@km yama",
      "@inuyama nanami",
      "@revolverwing",
      "@suna (s73d)",
      "@hanamiya natsuka",
      "@yoko juusuke",
      "@kiman",
      "@tatami to hinoki",
      "@vent arbre",
      "@hagiya masakage",
      "@simao (x x36131422)",
      "@betock",
      "@hoppege",
      "@da-kuro",
      "@yoon cook",
      "@arsenixc",
      "@moekibara fumitake",
      "@the only shoe",
      "@ld (luna dial398)",
      "@yaruku",
      "@ken (coffee michikusa)",
      "@ama-tou",
      "@hana mori",
      "@kobayashi yuuji",
      "@hirayama kanna",
      "@kazetto",
      "@119",
      "@minosu",
      "@kyaku tasu",
      "@tekehiro",
      "@seseren",
      "@greenopi",
      "@lynus",
      "@wasabi60",
      "@ment",
      "@alexander dinh",
      "@kujira naoto",
      "@ryou-san",
      "@ruhika",
      "@isa (peien516)",
      "@yukineko1018",
      "@mayogii",
      "@everyntrge",
      "@nejikyuu",
      "@muroku (aimichiyo0526)",
      "@nanashii (soregasisan)",
      "@jiroo",
      "@suterii",
      "@ame (amechan17391739)",
      "@suwa yasai",
      "@hyanna-natsu",
      "@throtem",
      "@chiyo (pk19981234)",
      "@rella",
      "@kobaji",
      "@suisogenshi",
      "@yaman",
      "@gintarou (kurousagi108)",
      "@shiraue yuu",
      "@nnyara",
      "@koyama hirokazu",
      "@sasahara yuuki",
      "@aoi manabu",
      "@ningen mame",
      "@itohana",
      "@kyou (fr39)",
      "@akita hika",
      "@ziro (zirorong)",
      "@otokamu",
      "@automatic giraffe",
      "@koyashaka",
      "@shugao",
      "@shinozuka atsuto",
      "@maou alba",
      "@ikeshita moyuko",
      "@dakemakura-koubou",
      "@rei kun",
      "@rotomdocs",
      "@zono (inokura syuzo029)",
      "@natuna natu",
      "@barbarian tk",
      "@mabanna",
      "@nanao (mahaya)",
      "@huqu",
      "@fuwa daisuke",
      "@atoki",
      "@robaco",
      "@zepher (makegumi club)",
      "@h2so4",
      "@irohara",
      "@hitoto",
      "@cocozasa",
      "@takara akihito",
      "@sasairebun",
      "@himegi",
      "@kokka han",
      "@haruyuki (yukichasoba)",
      "@jiru (jirufun)",
      "@go-1",
      "@pepe (jonasan)",
      "@yamiochi umekichi",
      "@hominamia",
      "@enami katsumi",
      "@maccha",
      "@saeki hokuto",
      "@kon-kit",
      "@lilish",
      "@fbc",
      "@shamu (peach11 01)",
      "@pumpkinpan",
      "@takahashi tetsuya",
      "@mcgunngu",
      "@akabane (zebrasmise)",
      "@gggg",
      "@akaneko (redakanekocat)",
      "@shipii (jigglypuff)",
      "@kaedeko (kaedelic)",
      "@greenmarine",
      "@katagiri hinata",
      "@dyun",
      "@kuro yuzu",
      "@oniilus",
      "@sakura chiyo (konachi000)",
      "@kion-kun",
      "@beeru (veil8801)",
      "@endou hiroto",
      "@om (nk2007)",
      "@siiqa vivi",
      "@sonao",
      "@shino (eefy)",
      "@volkor",
      "@akira (coffee curry)",
      "@shinomu (cinomoon)",
      "@arizuka (catacombe)",
      "@kazuharu kina",
      "@genek",
      "@huu (dighapdlxm12)",
      "@nanaken nana",
      "@suiso (owp)",
      "@fujikawa daichi",
      "@lamb (hitsujiniku)",
      "@547th sy",
      "@umakuchi shouyu",
      "@koshika rina",
      "@tenneko yuuri",
      "@watarase piro",
      "@aleriia v",
      "@toho10min",
      "@sanpachishiki (gyokusai-jima)",
      "@teranekosu",
      "@heebee",
      "@maullarmaullar",
      "@ojo aa",
      "@kuurunaitsu",
      "@shiratsuki shiori",
      "@yagi (ningen)",
      "@koya (koya x 00)",
      "@kirai y",
      "@hanomido",
      "@hatoyama itsuru",
      "@bbc-chan",
      "@yuasan",
      "@mimofu (fullhighkick)",
      "@lam (ramdayo)",
      "@leviathan (hikinito0902)",
      "@toriniku senshi chikinman",
      "@kippuru",
      "@kito (sorahate)",
      "@kshimu",
      "@zirba",
      "@tina fate",
      "@moribuden",
      "@nagi ryou",
      "@henyaan (oreizm)",
      "@himadera",
      "@hanada hyou",
      "@lewdamone",
      "@momoji (lobolobo2010)",
      "@aliceyawnin",
      "@sekiya asami",
      "@muoto",
      "@morizono shiki",
      "@porqueloin",
      "@kago no tori",
      "@yamaguchi yuu",
      "@kamidan",
      "@rat huang",
      "@saeki tatsuya",
      "@bukimi isan",
      "@kimishima ao",
      "@powerlesssong",
      "@chorimokki",
      "@mizukikushou",
      "@cowfee",
      "@frfr",
      "@ayanakitori",
      "@twistedscarlett60",
      "@gin moku",
      "@gomipomi",
      "@nanahime",
      "@niy (nenenoa)",
      "@salt (salty)",
      "@yasuda akira",
      "@ferret-san",
      "@sebu illust",
      "@romi (346 ura)",
      "@p19",
      "@pudding (skymint 028)",
      "@aramori susumu",
      "@mikeran (mikelan)",
      "@bobobo1345",
      "@ryunnu",
      "@sawaya (mizukazu)",
      "@bomber grape",
      "@maruto!",
      "@junkpuyo",
      "@yutsu",
      "@midori foo",
      "@ui frara",
      "@gyouza (mhea5724)",
      "@ddangbi",
      "@ayase hazuki",
      "@ya-man",
      "@hamushima",
      "@ankkoyom",
      "@miyako (naotsugu)",
      "@mizushina minato",
      "@mikage sekizai",
      "@fujieda uzuki",
      "@obui",
      "@kazaana",
      "@kyokucho",
      "@nago purin",
      "@curakuru",
      "@merrytail",
      "@tsukinami kousuke",
      "@nokoppa",
      "@suou-sensei",
      "@teruki kuma",
      "@fud",
      "@terazip",
      "@sakiyo cake",
      "@onineko-chan",
      "@samegami",
      "@tonbi",
      "@tanihara natsuki",
      "@unacchi (nyusankin)",
      "@mx2j",
      "@himonoata",
      "@akisome hatsuka",
      "@nanana (nanana iz)",
      "@ai-wa",
      "@kamata yuuya",
      "@aetherion",
      "@osisio",
      "@nohito",
      "@hijikawa arashi",
      "@kurogarasu",
      "@bifidus",
      "@monorus",
      "@shizuna kaede",
      "@nonoririn",
      "@hoshi (snacherubi)",
      "@coldcat.",
      "@arikawa satoru",
      "@aida takanobu",
      "@shishi juuroku",
      "@syroh",
      "@ranf",
      "@kotobuki (stealth sendan)",
      "@cyclone (reizei)",
      "@soramuko",
      "@fouriasensei",
      "@azuma shino",
      "@goomrrat",
      "@sakanaya (sakanaya952)",
      "@tidsean",
      "@marui koishi",
      "@masoq",
      "@motomiya mitsuki",
      "@shirosuzu",
      "@hijiri tsukasa",
      "@yan kodiac",
      "@racchi.",
      "@satsuki neko",
      "@hakai shin",
      "@gulp5959",
      "@kyousaru",
      "@so-bin",
      "@yasojima nejiro",
      "@melaton",
      "@uousa-ou",
      "@jan azure",
      "@akane souichi",
      "@ray-k",
      "@hater (hatater)",
      "@yamamoto arifred",
      "@eckert&eich",
      "@horikou",
      "@hinata (user rjkt4745)",
      "@ishida umi",
      "@kugelschreiber",
      "@mibry (phrysm)",
      "@makigai",
      "@interstellar",
      "@aoki ume",
      "@ruteko (ruko220)",
      "@bowwow (hamju94)",
      "@mizuki (koko lost)",
      "@hashimoto takashi"
];

    const ARTIST_TAGS_SET = new Set(ARTIST_TAGS.map((tag) => tag.toLowerCase()));

    const CATEGORY_TAGS = [
      ['人数', ['1girl', '1boy', '2girls', '2boys', 'multiple girls', 'multiple boys', 'solo', 'no humans']],
      ['质量', ['masterpiece', 'best quality', 'score_7', 'safe']],
      ['外观', ['long hair', 'short hair', 'black hair', 'blue hair', 'blonde hair', 'silver hair',
        'auburn hair', 'red eyes', 'blue eyes', 'amber eyes', 'green eyes', 'side braids', 'twintails',
        'ponytail', 'sailor collar', 'red ribbon', 'school uniform', 'pleated skirt', 'jacket',
        'white shirt', 'gloves', 'scarf', 'hat']],
      ['动作/表情', ['smile', 'blush', 'open mouth', 'looking at viewer', 'looking away', 'from behind',
        'profile', 'three-quarter view', 'standing', 'sitting', 'walking', 'running', 'arms crossed',
        'hands in pockets', 'pointing']],
      ['场景', ['cherry blossoms', 'falling petals', 'petals', 'tree', 'forest', 'sky', 'clouds',
        'sunset', 'sunrise', 'night', 'starry sky', 'moon', 'rain', 'umbrella', 'city', 'street',
        'neon lights', 'school', 'classroom', 'window', 'riverside', 'golden hour']],
      ['镜头', ['wide shot', 'full body', 'cowboy shot', 'upper body', 'close-up', 'medium shot',
        'from above', 'from below', 'from side', 'dutch angle', 'bokeh', 'depth of field']],
      ['光照/风格', ['backlight', 'rim light', 'cinematic lighting', 'dramatic lighting', 'soft lighting',
        'volumetric light', 'lens flare', 'monochrome', 'watercolor', 'sketch', 'anime',
        '2D cel shading', 'clean line art', 'pastel palette']],
    ];

    const ALL_TAGS = [];
    catLoop: for (const entry of CATEGORY_TAGS) {
      for (const tag of entry[1]) {
        ALL_TAGS.push({ value: tag, category: entry[0] });
      }
    }
    for (const tag of CHARACTER_TAGS) ALL_TAGS.push({ value: tag, category: '角色' });
    for (const tag of ARTIST_TAGS) ALL_TAGS.push({ value: tag, category: '画师' });

    const CATEGORY_SETS = {};
    for (const entry of CATEGORY_TAGS) CATEGORY_SETS[entry[0]] = new Set(entry[1].map((tag) => tag.toLowerCase()));
    const QUALITY_WORDS = new Set([
      'masterpiece', 'best quality', 'score_7', 'score_6', 'score_5', 'safe',
      'worst quality', 'low quality', 'score_1', 'score_2', 'score_3',
      'artist name', 'blurry', 'jpeg artifacts', 'chromatic aberration',
    ]);
    const COUNT_RE = /^(1girl|1boy|2girls|2boys|3girls|3boys|multiple girls|multiple boys|solo|no humans)$/i;

    function tokenRole(raw, negative) {
      const token = raw.trim();
      const lower = token.toLowerCase();
      if (!token) return 'punct';
      if (lower.startsWith('@')) return 'artist';
      if (QUALITY_WORDS.has(lower) || /^score_[0-9]+$/.test(lower)) return negative ? 'neg' : 'quality';
      if (COUNT_RE.test(lower)) return 'count';
      if (CHARACTER_TAGS.some((tag) => tag.toLowerCase() === lower)) return 'character';
      if (CATEGORY_SETS['镜头'] && CATEGORY_SETS['镜头'].has(lower)) return 'camera';
      if (CATEGORY_SETS['光照/风格'] && CATEGORY_SETS['光照/风格'].has(lower)) return 'light';
      if ((CATEGORY_SETS['外观'] && CATEGORY_SETS['外观'].has(lower)) || (CATEGORY_SETS['动作/表情'] && CATEGORY_SETS['动作/表情'].has(lower))) return 'detail';
      if (CATEGORY_SETS['场景'] && CATEGORY_SETS['场景'].has(lower)) return 'scene';
      if (/[\u4e00-\u9fff]/.test(token) || token.split(' ').length >= 4) return 'prose';
      return 'tag';
    }

    const SERIES_TAGS = new Set([
      'vocaloid', 'fate', 'genshin impact', 'honkai star rail', 'blue archive', 'touhou',
      'kantai collection', 'azur lane', 'love live', 'idolmaster', 'hololive',
      'umamusume', 'arknights', 'nikke', 'chainsaw man', 'jujutsu kaisen', 'demon slayer',
    ]);
    const STYLE_WORDS = new Set([
      'anime', '2d cel shading', 'clean line art', 'watercolor', 'sketch', 'monochrome',
      'pastel palette', 'oil painting', 'flat color', 'lineart', 'cel shading', 'painterly',
      'traditional media', '3d', 'photorealistic', 'realistic',
    ]);
    const SORT_RANK = {
      quality: 10, count: 20, character: 30, series: 40, artist: 50,
      detail: 60, pose: 70, scene: 80, camera: 90, light: 100, style: 110,
      tag: 120, prose: 130, neg: 10, punct: 999, weight: 65,
    };
    const POSE_WORDS = new Set(['standing', 'sitting', 'walking', 'running', 'lying', 'kneeling', 'jumping', 'squatting', 'leaning', 'arms crossed', 'hands in pockets', 'pointing', 'waving', 'hugging', 'holding']);

    function sortRankOf(raw, negative) {
      const token = raw.trim();
      const lower = token.toLowerCase();
      const weight = /^\(([^():]+):([0-9.]+)\)$/.exec(token);
      const inner = weight ? weight[1].trim() : token;
      const innerLower = inner.toLowerCase();
      if (SERIES_TAGS.has(innerLower)) return SORT_RANK.series;
      if (ARTIST_TAGS_SET.has(innerLower) || innerLower.startsWith('@')) return SORT_RANK.artist;
      if (POSE_WORDS.has(innerLower.split(',')[0])) return SORT_RANK.pose;
      if (STYLE_WORDS.has(innerLower)) return SORT_RANK.style;
      let role = tokenRole(inner, negative);
      if (role === 'detail' && POSE_WORDS.has(innerLower)) role = 'pose';
      return SORT_RANK[role] != null ? SORT_RANK[role] : SORT_RANK.tag;
    }

    function sortTags(text) {
      const seen = new Set();
      const tokens = String(text || '')
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean);
      const unique = [];
      let duplicates = 0;
      for (const token of tokens) {
        const key = token.toLowerCase();
        if (seen.has(key)) {
          duplicates += 1;
          continue;
        }
        seen.add(key);
        unique.push(token);
      }
      unique.sort((a, b) => sortRankOf(a, false) - sortRankOf(b, false));
      return { text: unique.join(', '), count: unique.length, duplicates };
    }

    function renderPrompt(text, negative) {
      return text.split(/([,，\n])/).map((token, index) => {
        if (index % 2) {
          return token === '\n' ? token : h('span', { key: index, className: 'ps-tok ps-punct' }, token);
        }
        const weight = /^(\s*)\(([^():]+):([0-9.]+)\)(\s*)$/.exec(token);
        if (weight) {
          return h(
            'span',
            { key: index, className: 'ps-tok ps-weight' },
            weight[1] + '(',
            h('span', { className: 'ps-weight-tag' }, weight[2]),
            h('span', { className: 'ps-weight-num' }, ':' + weight[3]),
            ')' + weight[4]
          );
        }
        return h('span', { key: index, className: 'ps-tok ps-' + tokenRole(token, negative) }, token);
      });
    }

    function Legend({ chinese }) {
      const items = [
        ['ps-quality', '质量', 'Quality'],
        ['ps-count', '人数', 'Count'],
        ['ps-character', '角色', 'Character'],
        ['ps-artist', '画师', 'Artist'],
        ['ps-camera', '镜头', 'Camera'],
        ['ps-light', '光照', 'Lighting'],
        ['ps-scene', '场景', 'Scene'],
        ['ps-prose', '自然语言', 'Prose'],
        ['ps-weight-num', '权重', 'Weight'],
      ];
      return h(
        'div',
        { className: 'ps-legend' },
        items.map(([cls, zh, en]) =>
          h('span', { key: cls, className: 'ps-legend-item' },
            h('span', { className: 'ps-legend-swatch ' + cls, 'aria-hidden': true }),
            chinese ? zh : en
          )
        )
      );
    }

    const EMPTY = { subject: '', tags: '', scene: '', light: '', artist: '', free: '', negative: '' };
    const STORAGE_KEY = 'dsh.prompt-studio.v2';
    const HISTORY_KEY = 'dsh.prompt-studio.history.v1';

    const CSS = `
      .ps-root {
        --ps-canvas: #ffffff;
        --ps-chrome: #f8f8f8;
        --ps-panel: #f3f3f3;
        --ps-control: #ffffff;
        --ps-line: #e5e5e5;
        --ps-control-border: #cecece;
        --ps-hover: #e8e8e8;
        --ps-text: #292929;
        --ps-strong: #1f1f1f;
        --ps-muted: #616161;
        --ps-accent: #005fb8;
        --ps-primary: #005fb8;
        --ps-primary-hover: #004d97;
        --ps-selected: #cce7ff;
        --ps-selected-text: #172c40;
        --ps-selection: #0078d43d;
        --ps-scroll: #a6a6a6;
        --ps-shadow: #00000021;
        --ps-error: #b11e21;
        --ps-warning: #8a5700;
        --ps-success: #27752c;
        --ps-quality: #7a3e9d;
        --ps-count: #087c69;
        --ps-character: #795e26;
        --ps-artist: #a31515;
        --ps-camera: #005fb8;
        --ps-light: #007590;
        --ps-detail: #0451a5;
        --ps-scene: #008000;
        --ps-number: #087947;
        --ps-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
        width: 100%; box-sizing: border-box; color: var(--ps-text); background: var(--ps-canvas);
        font: 13px/1.5 Inter, 'Segoe UI', system-ui, sans-serif;
        color-scheme: light; scrollbar-color: var(--ps-scroll) transparent;
      }
      [data-ds-dark-theme] .ps-root {
        --ps-canvas: #1f1f1f;
        --ps-chrome: #181818;
        --ps-panel: #252526;
        --ps-control: #2b2b2b;
        --ps-line: #303030;
        --ps-control-border: #454545;
        --ps-hover: #313131;
        --ps-text: #cccccc;
        --ps-strong: #ededed;
        --ps-muted: #a0a0a0;
        --ps-accent: #4daafc;
        --ps-primary: #0078d4;
        --ps-primary-hover: #0069bd;
        --ps-selected: #04395e;
        --ps-selected-text: #ffffff;
        --ps-selection: #3d7db76e;
        --ps-scroll: #616161;
        --ps-shadow: #00000050;
        --ps-error: #f48771;
        --ps-warning: #cca700;
        --ps-success: #89d185;
        --ps-quality: #c586c0;
        --ps-count: #4ec9b0;
        --ps-character: #dcdcaa;
        --ps-artist: #ce9178;
        --ps-camera: #569cd6;
        --ps-light: #4fc1ff;
        --ps-detail: #9cdcfe;
        --ps-scene: #83ad6e;
        --ps-number: #b5cea8;
        color-scheme: dark;
      }
      .ps-page { height: 100%; overflow: auto; container-type: inline-size; }
      .ps-root :is(button, input, select, textarea, summary, [tabindex]):focus-visible {
        outline: 1px solid var(--ps-accent); outline-offset: -1px;
      }
      .ps-root button {
        box-sizing: border-box; border: 1px solid transparent; border-radius: 3px; background: transparent;
        color: var(--ps-text); font: inherit; cursor: pointer;
      }
      .ps-root button:hover { background: var(--ps-hover); color: var(--ps-strong); }
      .ps-root .ps-primary {
        background: var(--ps-primary); border-color: var(--ps-primary); color: #ffffff;
      }
      .ps-root .ps-primary:hover { background: var(--ps-primary-hover); color: #ffffff; }
      .ps-root :is(select, input, .ps-field-input) {
        box-sizing: border-box; min-width: 0; max-width: 100%; border: 1px solid var(--ps-control-border);
        border-radius: 3px; background: var(--ps-control); color: var(--ps-strong); font: inherit;
      }
      .ps-root :is(select, input) { min-height: 28px; padding: 3px 7px; }
      .ps-root :is(input, textarea)::placeholder { color: var(--ps-muted); }

      .ps-head {
        display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px 20px;
        min-height: 36px; padding: 8px 16px; background: var(--ps-chrome); border-bottom: 1px solid var(--ps-line);
      }
      .ps-title, .ps-head-actions, .ps-preset { display: flex; align-items: center; gap: 8px; min-width: 0; }
      .ps-head h2 { margin: 0; color: var(--ps-strong); font-size: 14px; font-weight: 600; }
      .ps-workbench-icon { color: var(--ps-accent); font: 600 14px var(--ps-mono); }
      .ps-head-actions { flex-wrap: wrap; }
      .ps-preset { color: var(--ps-muted); font-size: 12px; }
      .ps-preset > span { white-space: nowrap; }
      .ps-preset select { width: 190px; max-width: 65vw; color: var(--ps-text); }
      .ps-head-actions button { padding: 3px 7px; font-size: 12px; white-space: nowrap; }
      .ps-flash { min-height: 16px; color: var(--ps-success); font-size: 11px; }
      .ps-flash.ps-bad { color: var(--ps-error); }
      .ps-layout { display: grid; grid-template-columns: minmax(0, 1.5fr) minmax(300px, 1fr); align-items: start; }
      .ps-editor-group { align-self: stretch; min-width: 0; border-right: 1px solid var(--ps-line); }
      .ps-preview-card {
        position: sticky; top: 0; min-width: 0; max-height: 100vh; overflow: auto;
      }

      .ps-tabs {
        display: flex; align-items: stretch; min-height: 35px; background: var(--ps-chrome);
        border-bottom: 1px solid var(--ps-line); color: var(--ps-muted);
      }
      .ps-file-tab {
        display: flex; align-items: center; gap: 8px; padding: 0 13px; min-width: 0;
        border-top: 1px solid var(--ps-accent); border-right: 1px solid var(--ps-line);
        background: var(--ps-canvas); color: var(--ps-strong); font-size: 12px;
      }
      .ps-editor-tab .ps-file-tab { font-family: var(--ps-mono); }
      .ps-file-icon {
        position: relative; flex: none; width: 8px; height: 10px; border: 1px solid currentColor;
        border-radius: 1px; color: var(--ps-accent);
      }
      .ps-file-icon::after {
        content: ''; position: absolute; inset: 3px 1px auto; height: 2px;
        border-block: 1px solid currentColor;
      }
      .ps-editor-neg .ps-file-icon, .ps-preview-negative .ps-file-icon { color: var(--ps-artist); }
      .ps-tab-btn { align-self: center; margin: 0 8px 0 auto; padding: 1px 7px; font-size: 13px; }
      .ps-editor { position: relative; min-width: 0; background: var(--ps-canvas); }
      .ps-editor-body { position: relative; display: flex; height: 240px; overflow: hidden; }
      .ps-editor-neg .ps-editor-body { height: 150px; }
      .ps-editor-expanded .ps-editor-body { height: 440px; }
      .ps-gutter {
        box-sizing: border-box; flex: none; width: 44px; padding: 10px 10px 10px 4px;
        color: var(--ps-muted); font: 12px/22px var(--ps-mono); text-align: right; user-select: none; overflow: hidden;
      }
      .ps-gutter .active { color: var(--ps-strong); }
      .ps-editor-scroll { position: relative; flex: 1; min-width: 0; height: 100%; }
      .ps-highlight, .ps-editor-input {
        position: absolute; inset: 0; width: 100%; height: 100%; box-sizing: border-box;
        margin: 0; padding: 10px 12px; border: 0; white-space: pre-wrap; overflow-wrap: break-word; overflow: auto;
        font: 400 14px/22px var(--ps-mono); letter-spacing: normal; tab-size: 4; font-variant-ligatures: none;
      }
      .ps-highlight { pointer-events: none; color: var(--ps-text); scrollbar-color: transparent transparent; }
      .ps-editor-input {
        background: transparent; outline: none; resize: none; color: transparent;
        -webkit-text-fill-color: transparent; caret-color: var(--ps-strong); z-index: 2;
      }
      .ps-editor-input::selection { background: var(--ps-selection); -webkit-text-fill-color: transparent; }
      .ps-placeholder { color: var(--ps-muted); }
      .ps-editor-bar {
        display: flex; align-items: center; gap: 5px; flex-wrap: wrap; padding: 5px 10px;
        border-top: 1px solid var(--ps-line); background: var(--ps-canvas);
      }
      .ps-root :is(.ps-chip, .ps-editor-chip) {
        border-color: var(--ps-line); background: var(--ps-chrome); padding: 2px 6px;
        font: 11px/1.5 var(--ps-mono); max-width: 100%; overflow-wrap: anywhere; text-align: left;
      }
      .ps-root :is(.ps-chip, .ps-editor-chip):hover { background: var(--ps-hover); border-color: var(--ps-control-border); }
      .ps-status {
        display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 4px 12px;
        padding: 4px 12px; background: var(--ps-chrome); border-block: 1px solid var(--ps-line);
        font: 11px/1.4 var(--ps-mono); color: var(--ps-muted);
      }
      .ps-status-pos { color: var(--ps-accent); }

      .ps-tools { padding: 12px 16px 18px; display: grid; gap: 12px; background: var(--ps-canvas); }
      .ps-toolbar {
        display: flex; flex-wrap: wrap; gap: 3px; padding: 4px 10px;
        border-bottom: 1px solid var(--ps-line); background: var(--ps-chrome);
      }
      .ps-toolbar button, .ps-panel-actions button { padding: 4px 8px; font-size: 12px; }
      .ps-toolbar button[aria-expanded='true'] { background: var(--ps-hover); box-shadow: inset 0 -1px var(--ps-accent); }
      .ps-row, .ps-examples { display: flex; align-items: center; flex-wrap: wrap; gap: 5px; min-width: 0; }
      .ps-row-label { margin-right: 4px; font-size: 12px; color: var(--ps-muted); }
      .ps-mini { font-size: 11px; color: var(--ps-muted); }
      .ps-field { display: grid; align-content: start; gap: 4px; min-width: 0; }
      .ps-field-label { font-size: 12px; color: var(--ps-muted); }
      .ps-root .ps-field-input { width: 100%; min-height: 52px; padding: 6px 8px; resize: vertical; font: 12px/1.5 var(--ps-mono); }
      .ps-root .ps-artist-input { width: 100%; font: 12px/1.5 var(--ps-mono); }
      .ps-details { border-block: 1px solid var(--ps-line); }
      .ps-details summary {
        padding: 7px 8px; color: var(--ps-text); background: var(--ps-chrome); cursor: pointer; user-select: none;
      }
      .ps-details summary:hover { background: var(--ps-hover); }
      .ps-fields { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; padding: 10px 0; }
      .ps-negative-field { grid-column: 1 / -1; border: 1px solid var(--ps-line); }
      .ps-panel { min-width: 0; border-bottom: 1px solid var(--ps-line); background: var(--ps-panel); }
      .ps-panel-title {
        margin: 0; padding: 6px 12px; background: var(--ps-chrome);
        border-bottom: 1px solid var(--ps-line); color: var(--ps-strong); font-size: 12px; font-weight: 600;
      }
      .ps-panel-body { display: grid; gap: 8px; padding: 10px 12px; }
      .ps-history-row { display: flex; align-items: center; gap: 8px; min-width: 0; }
      .ps-root .ps-history-main {
        flex: 1; min-width: 0; display: flex; align-items: baseline; justify-content: space-between;
        flex-wrap: wrap; gap: 2px 8px; padding: 4px 7px; text-align: left;
      }
      .ps-history-title { max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .ps-export-field { display: flex; align-items: center; gap: 6px; min-width: 0; }
      .ps-root .ps-export-name { width: 130px; font-family: var(--ps-mono); }
      .ps-export-preview {
        max-height: 160px; overflow: auto; overflow-wrap: anywhere; margin: 0; padding: 8px 10px;
        background: var(--ps-canvas); border: 1px solid var(--ps-line); white-space: pre-wrap; font: 12px/1.5 var(--ps-mono);
      }

      .ps-preview-file { min-width: 0; border-bottom: 1px solid var(--ps-line); }
      .ps-preview-head {
        display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 4px 8px;
        min-height: 33px; padding: 0 8px 0 12px; border-bottom: 1px solid var(--ps-line); background: var(--ps-chrome);
      }
      .ps-preview-name { display: flex; align-items: center; gap: 7px; color: var(--ps-strong); font-size: 12px; }
      .ps-preview-name b { font-weight: 500; }
      .ps-preview-head button { padding: 2px 7px; font-size: 11px; }
      .ps-code {
        box-sizing: border-box; min-height: 104px; max-height: 220px; overflow: auto; padding: 11px 13px;
        background: var(--ps-canvas); white-space: pre-wrap; overflow-wrap: anywhere;
        font: 13px/21px var(--ps-mono); user-select: text;
      }
      .ps-preview-negative .ps-code { min-height: 72px; max-height: 160px; }
      .ps-legend {
        display: flex; flex-wrap: wrap; gap: 5px 10px; padding: 8px 12px; font-size: 11px; color: var(--ps-muted);
      }
      .ps-legend-item { display: inline-flex; align-items: center; gap: 5px; }
      .ps-legend-swatch { width: 7px; height: 7px; border-radius: 1px; background: currentColor; }
      .ps-punct, .ps-prose { color: var(--ps-muted); }
      .ps-quality { color: var(--ps-quality); }
      .ps-count { color: var(--ps-count); }
      .ps-character { color: var(--ps-character); }
      .ps-artist { color: var(--ps-artist); }
      .ps-camera { color: var(--ps-camera); }
      .ps-light { color: var(--ps-light); }
      .ps-detail { color: var(--ps-detail); }
      .ps-scene { color: var(--ps-scene); }
      .ps-neg { color: var(--ps-error); }
      .ps-weight-num { color: var(--ps-number); }

      .ps-checks { background: var(--ps-chrome); border-block: 1px solid var(--ps-line); }
      .ps-check { display: flex; align-items: baseline; gap: 8px; color: var(--ps-muted); font-size: 12px; }
      .ps-check-marker { flex: none; width: 12px; color: var(--ps-accent); text-align: center; font: 600 12px var(--ps-mono); }
      .ps-warn .ps-check-marker { color: var(--ps-warning); }
      .ps-ok .ps-check-marker { color: var(--ps-success); }
      .ps-settings { color: var(--ps-muted); padding: 9px 12px; font: 11px/1.5 var(--ps-mono); }
      .ps-footer { border-top: 1px solid var(--ps-line); padding: 7px 14px; background: var(--ps-chrome); }
      .ps-error { padding: 16px; color: var(--ps-error); }

      .ps-suggest {
        position: absolute; z-index: 120; box-sizing: border-box; width: min(360px, 100%); max-height: 190px;
        overflow: auto; overscroll-behavior: contain; background: var(--ps-panel);
        border: 1px solid var(--ps-control-border); border-radius: 3px;
        box-shadow: 0 5px 16px var(--ps-shadow); font: 13px/1.5 var(--ps-mono);
      }
      .ps-suggest-head, .ps-suggest-footer {
        padding: 4px 9px; background: var(--ps-chrome); color: var(--ps-muted); font-size: 11px;
      }
      .ps-suggest-head {
        position: sticky; top: 0; display: flex; justify-content: space-between; gap: 8px;
        border-bottom: 1px solid var(--ps-line); overflow-wrap: anywhere;
      }
      .ps-suggest-footer { border-top: 1px solid var(--ps-line); }
      .ps-suggest .ps-cat { flex: none; color: var(--ps-muted); font-size: 11px; }
      .ps-suggest button {
        display: flex; align-items: center; justify-content: space-between; gap: 8px; width: 100%;
        padding: 4px 9px; border: 0; border-radius: 0; text-align: left; overflow-wrap: anywhere;
      }
      .ps-suggest button.ps-active { background: var(--ps-selected); color: var(--ps-selected-text); }
      .ps-suggest button.ps-active .ps-cat { color: inherit; opacity: .85; }

      @container (max-width: 700px) {
        .ps-layout { grid-template-columns: minmax(0, 1fr); }
        .ps-editor-group { border-right: 0; }
        .ps-preview-card { position: static; max-height: none; overflow: visible; border-top: 1px solid var(--ps-line); }
      }
      @container (max-width: 420px) {
        .ps-head, .ps-tools { padding-inline: 10px; }
        .ps-fields { grid-template-columns: minmax(0, 1fr); }
        .ps-gutter { width: 34px; }
      }
    `;

    function clean(value) {
      return String(value == null ? '' : value).trim().replace(/^[,，\s]+|[,，\s]+$/g, '');
    }

    function activeLocale(locale) {
      try {
        if (locale && typeof locale.getLocale === 'function') {
          const snapshot = locale.getLocale();
          if (snapshot && snapshot.active) return String(snapshot.active).toLowerCase();
        }
      } catch (err) {
        /* keep default */
      }
      return 'zh';
    }

    function artistTag(raw) {
      const src = clean(raw);
      if (!src) return '';
      return src
        .split(/[,，]/)
        .map((part) => part.trim())
        .filter(Boolean)
        .map((part) => (part.startsWith('@') ? part : '@' + part.replace(/^@+/, '')))
        .join(', ');
    }

    function composePositive(preset, fields) {
      const parts = [preset.prefix, fields.tags, fields.subject, artistTag(fields.artist), fields.scene, fields.light, fields.free, preset.suffix];
      return parts
        .map(clean)
        .filter(Boolean)
        .join(', ')
        .replace(/,\s*,+/g, ', ')
        .trim();
    }

    function composeNegative(preset, fields) {
      const seen = new Set();
      const parts = [];
      const push = (value) => {
        clean(value)
          .split(/[,，]/)
          .map((part) => part.trim())
          .filter(Boolean)
          .forEach((part) => {
            const key = part.toLowerCase();
            if (!seen.has(key)) {
              seen.add(key);
              parts.push(part);
            }
          });
      };
      if (fields.negative && /worst quality|low quality|score_1/i.test(fields.negative)) {
        push(fields.negative);
      } else {
        push(preset.negative);
        push(fields.negative);
      }
      return parts.join(', ');
    }

    function lint(preset, positive, negative, fields) {
      const out = [];
      if (!positive.trim()) {
        out.push({ level: 'info', key: 'checkEmpty' });
        return out;
      }
      if (preset.anima && !/masterpiece|best quality|score_[5-9]/i.test(positive)) out.push({ level: 'warn', key: 'checkNoQuality' });
      if (/[\u4e00-\u9fff]/.test(positive)) out.push({ level: 'info', key: 'checkCjk' });
      const underscore = positive
        .split(',')
        .map((part) => part.trim())
        .filter((part) => part.includes('_') && !/^score_/.test(part) && !part.startsWith('@'));
      if (underscore.length) out.push({ level: 'warn', key: 'checkUnderscore', extra: underscore.slice(0, 3).join(', ') });
      const heavy = [];
      const re = /\(([^():]+):([0-9.]+)\)/g;
      let match;
      while ((match = re.exec(positive)) !== null) {
        if (parseFloat(match[2]) > 2) heavy.push(match[1]);
      }
      if (heavy.length) out.push({ level: 'info', key: 'checkWeight', extra: heavy.slice(0, 3).join(', ') });
      if (preset.anima && clean(fields.tags) && !/(1girl|1boy|solo|2girls|2boys|no humans)/i.test(positive)) {
        out.push({ level: 'info', key: 'checkCount' });
      }
      if (preset.anima && !/worst quality|low quality|score_1/i.test(negative)) out.push({ level: 'info', key: 'checkNegative' });
      if (positive.length > 1500) out.push({ level: 'info', key: 'checkLong' });
      return out;
    }

    async function writeClipboard(text) {
      if (!text) return false;
      try {
        if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
          return true;
        }
        if (typeof document !== 'undefined') {
          const area = document.createElement('textarea');
          area.value = text;
          area.setAttribute('readonly', 'readonly');
          area.style.position = 'fixed';
          area.style.left = '-9999px';
          document.body.appendChild(area);
          area.select();
          const ok = document.execCommand('copy');
          document.body.removeChild(area);
          return ok;
        }
      } catch (err) {
        return false;
      }
      return false;
    }

    function caretRect(highlight, offset) {
      const walker = document.createTreeWalker(highlight, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        if (offset <= node.length) {
          const range = document.createRange();
          range.setStart(node, offset);
          range.collapse(true);
          return range.getBoundingClientRect();
        }
        offset -= node.length;
      }
      return null;
    }

    function currentToken(value, caret) {
      const before = value.slice(0, caret);
      const prefix = before.split(/[,，\n]/).pop().trimStart();
      const start = caret - prefix.length;
      const nextSeparator = value.slice(caret).search(/[,，\n]/);
      const boundary = nextSeparator === -1 ? value.length : caret + nextSeparator;
      const end = start + value.slice(start, boundary).trimEnd().length;
      return { start, end, prefix, hasSeparator: nextSeparator !== -1 };
    }

    function suggestionsFor(token) {
      const raw = token.trim();
      if (!raw) return [];
      const lowered = raw.toLowerCase();
      if (lowered.startsWith('@')) {
        return ARTIST_TAGS.filter((tag) => tag.toLowerCase().startsWith(lowered))
          .slice(0, 8)
          .map((tag) => ({ value: tag, category: '画师' }));
      }
      if (lowered.startsWith('(')) {
        const inner = lowered.replace(/^\(/, '').split(':')[0].trim();
        const bases = ALL_TAGS.filter((item) => item.value.toLowerCase().startsWith(inner)).slice(0, 3);
        const out = [];
        for (const base of bases) {
          for (const weight of ['1.2', '1.5', '2.0']) {
            out.push({ value: '(' + base.value + ':' + weight + ')', category: '权重' });
          }
        }
        return out.slice(0, 9);
      }
      return ALL_TAGS.filter((item) => item.value.toLowerCase().startsWith(lowered))
        .slice(0, 8)
        .map((item) => ({ value: item.value, category: item.category }));
    }

    function Field(props) {
      const { label, value, onChange, placeholder } = props;
      return h(
        'label',
        { className: 'ps-field' },
        h('span', { className: 'ps-field-label' }, label),
        h('textarea', {
          className: 'ps-field-input',
          value,
          placeholder,
          spellCheck: false,
          onChange: (event) => onChange(event.target.value),
        })
      );
    }

    function CodeEditor(props) {
      const { value, onChange, label, placeholder, negative, t, quickTags } = props;
      const editorRef = useRef(null);
      const inputRef = useRef(null);
      const preRef = useRef(null);
      const gutterRef = useRef(null);
      const suggestRef = useRef(null);
      const composing = useRef(false);
      const [suggestion, setSuggest] = useState(null);
      const [expanded, setExpanded] = useState(false);
      const [cursorOffset, setCursorOffset] = useState(0);
      const text = String(value == null ? '' : value);
      const lineCount = text.split('\n').length;
      const beforeCaret = text.slice(0, cursorOffset);
      const cursorLine = beforeCaret.split('\n').length;
      const cursorColumn = beforeCaret.length - beforeCaret.lastIndexOf('\n');
      const tagCount = text.split(/[,，\n]/).filter((tag) => tag.trim()).length;
      const suggest = suggestion?.source === text ? suggestion : null;
      const suggestionCaret = suggest?.caret;

      useLayoutEffect(() => {
        setCursorOffset(inputRef.current.selectionStart);
        setSuggest((previous) => previous?.source === text ? previous : null);
      }, [text]);

      const refresh = (textarea, openOnInput = false) => {
        const { value, selectionStart, selectionEnd } = textarea;
        setCursorOffset(selectionStart);
        if (composing.current || selectionStart !== selectionEnd) {
          setSuggest(null);
          return;
        }
        if (!openOnInput && !suggest) return;
        const { prefix } = currentToken(value, selectionStart);
        if (suggest?.source === value && suggest.caret === selectionStart && suggest.prefix === prefix) return;
        const items = suggestionsFor(prefix);
        setSuggest(items.length ? { items, active: 0, caret: selectionStart, prefix, source: value } : null);
      };

      const applySuggestion = (item) => {
        const textarea = inputRef.current;
        if (!textarea || textarea.selectionStart !== textarea.selectionEnd) return;
        const { start, end, hasSeparator } = currentToken(text, textarea.selectionStart);
        const tail = text.slice(end);
        const insert = hasSeparator ? item.value : item.value + ',' + (tail || ' ');
        onChange(text.slice(0, start) + insert + (hasSeparator ? tail : ''));
        setSuggest(null);
        const pos = start + insert.length;
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(pos, pos);
            setCursorOffset(pos);
          }
        }, 0);
      };

      const onKeyDown = (event) => {
        if (!suggest || composing.current || event.nativeEvent.isComposing || event.keyCode === 229) return;
        if (suggestRef.current?.style.visibility !== 'visible') return;
        if (event.shiftKey || event.metaKey || event.altKey || event.ctrlKey) return;
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          setSuggest((prev) => prev && { ...prev, active: (prev.active + 1) % prev.items.length });
        } else if (event.key === 'ArrowUp') {
          event.preventDefault();
          setSuggest((prev) => prev && { ...prev, active: (prev.active - 1 + prev.items.length) % prev.items.length });
        } else if (event.key === 'Enter' || event.key === 'Tab') {
          event.preventDefault();
          applySuggestion(suggest.items[suggest.active]);
        } else if (event.key === 'Escape') {
          event.preventDefault();
          setSuggest(null);
        }
      };

      const wrapWeight = (weight) => {
        const textarea = inputRef.current;
        if (!textarea) return;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        let target = text.slice(start, end).trim();
        let from = start;
        let to = end;
        if (!target) {
          const { start: tokenStart } = currentToken(text, start);
          target = text.slice(tokenStart, start).trim();
          from = tokenStart;
          to = start;
        }
        if (!target) return;
        const wrapped = '(' + target + ':' + weight + ')';
        const next = text.slice(0, from) + wrapped + text.slice(to);
        onChange(next);
        const pos = from + wrapped.length;
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(pos, pos);
            setCursorOffset(pos);
          }
        }, 0);
      };

      const syncScroll = ({ currentTarget }) => {
        preRef.current.scrollTop = currentTarget.scrollTop;
        preRef.current.scrollLeft = currentTarget.scrollLeft;
        gutterRef.current.scrollTop = currentTarget.scrollTop;
      };

      useLayoutEffect(() => {
        if (suggestionCaret == null) return;
        const editor = editorRef.current;
        const textarea = inputRef.current;
        const highlight = preRef.current;
        const list = suggestRef.current;
        const page = editor.closest('.ps-page');
        const position = () => {
          const caret = caretRect(highlight, suggestionCaret);
          const inputBounds = textarea.getBoundingClientRect();
          const editorBounds = editor.getBoundingClientRect();
          const pageBounds = page.getBoundingClientRect();
          const top = Math.max(0, pageBounds.top);
          const bottom = Math.min(window.innerHeight, pageBounds.bottom);
          if (!caret?.height || caret.bottom <= Math.max(top, inputBounds.top) ||
              caret.top >= Math.min(bottom, inputBounds.bottom)) {
            list.style.visibility = 'hidden';
            return;
          }
          const gap = 5;
          const below = bottom - caret.bottom - gap;
          const above = caret.top - top - gap;
          list.style.maxHeight = '190px';
          const placeAbove = list.offsetHeight > below && above > below;
          const available = placeAbove ? above : below;
          list.style.maxHeight = Math.min(190, available) + 'px';
          const left = caret.left - editorBounds.left - editor.clientLeft;
          list.style.left = Math.max(0, Math.min(left, editor.clientWidth - list.offsetWidth)) + 'px';
          const y = placeAbove ? caret.top - gap - list.offsetHeight : caret.bottom + gap;
          list.style.top = y - editorBounds.top - editor.clientTop + 'px';
          list.style.visibility = available >= 44 ? 'visible' : 'hidden';
        };
        const resize = new ResizeObserver(position);
        resize.observe(editor);
        resize.observe(page);
        highlight.addEventListener('scroll', position);
        page.addEventListener('scroll', position);
        syncScroll({ currentTarget: textarea });
        position();
        return () => {
          resize.disconnect();
          highlight.removeEventListener('scroll', position);
          page.removeEventListener('scroll', position);
        };
      }, [suggestionCaret, text]);

      useLayoutEffect(() => {
        const list = suggestRef.current;
        const option = list?.querySelector('[aria-selected="true"]');
        if (!option) return;
        const optionBounds = option.getBoundingClientRect();
        const top = list.querySelector('.ps-suggest-head').getBoundingClientRect().bottom;
        const bottom = list.getBoundingClientRect().bottom;
        if (optionBounds.top < top) list.scrollTop -= top - optionBounds.top;
        if (optionBounds.bottom > bottom) list.scrollTop += optionBounds.bottom - bottom;
      }, [suggest]);

      const editorClass = 'ps-editor' + (negative ? ' ps-editor-neg' : '') + (expanded ? ' ps-editor-expanded' : '');
      return h(
        'div',
        { className: editorClass, ref: editorRef },
        h(
          'div',
          { className: 'ps-tabs ps-editor-tab' },
          h('span', { className: 'ps-file-tab' },
            h('span', { className: 'ps-file-icon', 'aria-hidden': true }),
            negative ? 'prompt.negative' : 'prompt.tags'
          ),
          h(
            'button',
            {
              type: 'button',
              className: 'ps-tab-btn',
              title: expanded ? t('collapseEditor') : t('expandEditor'),
              'aria-label': expanded ? t('collapseEditor') : t('expandEditor'),
              'aria-expanded': expanded,
              onClick: () => setExpanded((value) => !value),
            },
            expanded ? '▾' : '▸'
          )
        ),
        h(
          'div',
          { className: 'ps-editor-body' },
          h('div', { className: 'ps-gutter', ref: gutterRef, 'aria-hidden': 'true' }, Array.from({ length: lineCount }, (_, index) => h('div', { key: index, className: index + 1 === cursorLine ? 'active' : '' }, String(index + 1)))),
          h(
            'div',
            { className: 'ps-editor-scroll' },
            h('pre', { className: 'ps-highlight', ref: preRef, 'aria-hidden': 'true' },
              text ? renderPrompt(text, negative) : h('span', { className: 'ps-placeholder' }, placeholder),
              text.endsWith('\n') ? '\u200b' : null
            ),
            h('textarea', {
              ref: inputRef,
              className: 'ps-editor-input',
              value: text,
              spellCheck: false,
              wrap: 'soft',
              onChange: (event) => {
                onChange(event.target.value);
                refresh(event.currentTarget, true);
              },
              onKeyDown,
              onSelect: (event) => refresh(event.currentTarget),
              onCompositionStart: () => {
                composing.current = true;
                setSuggest(null);
              },
              onCompositionEnd: (event) => {
                composing.current = false;
                refresh(event.currentTarget, true);
              },
              onScroll: syncScroll,
              onBlur: () => setSuggest(null),
              'aria-label': label,
            })
          )
        ),
        h(
          'div',
          { className: 'ps-editor-bar' },
          h('span', { className: 'ps-row-label', title: t('weightLabel') }, t('weight')),
          ['1.2', '1.5', '2.0'].map((weight) =>
            h('button', { key: weight, type: 'button', className: 'ps-editor-chip', title: t('weightLabel'), onMouseDown: (event) => event.preventDefault(), onClick: () => wrapWeight(weight) }, weight)
          ),
          quickTags
            ? h('span', { className: 'ps-row' },
                h('span', { className: 'ps-row-label' }, t('quickTags')),
                quickTags.slice(0, 8).map((tag) =>
                  h('button', {
                    key: tag,
                    type: 'button',
                    className: 'ps-editor-chip',
                    onMouseDown: (event) => event.preventDefault(),
                    onClick: () => {
                      const next = clean(text) ? clean(text) + ', ' + tag : tag;
                      onChange(next);
                    },
                  }, tag)
                )
              )
            : null
        ),
        h('div', { className: 'ps-status' },
          h('span', { className: 'ps-status-pos' }, t('cursorPosition').replace('{line}', cursorLine).replace('{column}', cursorColumn)),
          h('span', null, tagCount + ' ' + t('tagsCount') + ' · ' + text.length + ' ' + t('chars') + ' · UTF-8 · LF')
        ),
        suggest
          ? h(
              'div',
              { className: 'ps-suggest', role: 'listbox', ref: suggestRef, style: { visibility: 'hidden' } },
              h('div', { className: 'ps-suggest-head' },
                h('span', null, t('suggestions') + ' · ' + suggest.prefix),
                h('span', { className: 'ps-cat' }, t('line') + ' ' + cursorLine)
              ),
              suggest.items.map((item, index) =>
                h(
                  'button',
                  {
                    key: item.value + index,
                    type: 'button',
                    role: 'option',
                    'aria-selected': index === suggest.active,
                    className: index === suggest.active ? 'ps-active' : '',
                    tabIndex: -1,
                    onPointerDown: (event) => event.preventDefault(),
                    onClick: () => applySuggestion(item),
                  },
                  h('span', null, item.value),
                  h('span', { className: 'ps-cat' }, item.category)
                )
              ),
              h('div', { className: 'ps-suggest-footer' }, t('suggestHint'))
            )
          : null,
      );
    }

    function PreviewFile({ title, text, negative, copyLabel, onCopy }) {
      return h(
        'div',
        { className: negative ? 'ps-preview-file ps-preview-negative' : 'ps-preview-file' },
        h('div', { className: 'ps-preview-head' },
          h('span', { className: 'ps-preview-name' },
            h('span', { className: 'ps-file-icon', 'aria-hidden': true }),
            h('b', null, title)
          ),
          h('button', { type: 'button', className: negative ? undefined : 'ps-primary', onClick: onCopy }, copyLabel)
        ),
        h('div',
          { className: 'ps-code', role: 'textbox', 'aria-label': title, 'aria-readonly': true, tabIndex: 0 },
          renderPrompt(text, negative)
        )
      );
    }

    class StudioBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { error: '' };
      }

      static getDerivedStateFromError(error) {
        return { error: error && error.message ? error.message : String(error) };
      }

      componentDidCatch(error) {
        if (typeof console !== 'undefined') console.error('prompt-studio render error', error);
      }

      render() {
        if (this.state.error) {
          return h(
            'div',
            { className: 'ps-root ps-page' },
            h('div', { className: 'ps-error' }, 'Anima Prompt Studio：' + this.state.error)
          );
        }
        return this.props.children;
      }
    }

    return {
      inject: ['slots'],
      apply(ctx) {
        const locale = ctx.get('locale');
        const t = (key) => {
          const dict = activeLocale(locale).startsWith('zh') ? ZH : EN;
          return dict[key] || ZH[key] || key;
        };
        if (locale && typeof locale.register === 'function') {
          try {
            ctx.effect(() => locale.register('promptStudio', 'zh', ZH));
          } catch (err) {
            /* optional */
          }
          try {
            ctx.effect(() => locale.register('promptStudio', 'en', EN));
          } catch (err) {
            /* optional */
          }
        }

        function PromptStudio() {
          const [presetId, setPresetId] = useState(PRESETS[0].id);
          const [fields, setFields] = useState(EMPTY);
          const [flash, setFlash] = useState('');
          const [history, setHistory] = useState([]);
          const [historyOpen, setHistoryOpen] = useState(false);
          const [exportOpen, setExportOpen] = useState(false);
          const [exportFormat, setExportFormat] = useState('txt');
          const [exportName, setExportName] = useState('');
          const [exportProject, setExportProject] = useState('my_project');
          const [exportShot, setExportShot] = useState('S01');
          const [dirHandle, setDirHandle] = useState(null);
          const [, setLocaleRev] = useState(0);
          const preset = PRESETS.find((item) => item.id === presetId) || PRESETS[0];
          const positive = composePositive(preset, fields);
          const negative = composeNegative(preset, fields);
          const issues = lint(preset, positive, negative, fields);

          useEffect(() => {
            try {
              const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
              if (!raw) return;
              const saved = JSON.parse(raw);
              if (saved && typeof saved === 'object') {
                if (saved.fields && typeof saved.fields === 'object') setFields(Object.assign({}, EMPTY, saved.fields));
                if (typeof saved.presetId === 'string' && PRESETS.some((item) => item.id === saved.presetId)) setPresetId(saved.presetId);
              }
            } catch (err) {
              /* ignore corrupt draft */
            }
          }, []);

          useEffect(() => {
            try {
              if (typeof localStorage !== 'undefined') {
                localStorage.setItem(STORAGE_KEY, JSON.stringify({ fields, presetId }));
              }
            } catch (err) {
              /* ignore storage errors */
            }
          }, [fields, presetId]);

          useEffect(() => {
            try {
              const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(HISTORY_KEY) : null;
              if (!raw) return;
              const list = JSON.parse(raw);
              if (Array.isArray(list)) setHistory(list.slice(0, 20));
            } catch (err) {
              /* ignore corrupt history */
            }
          }, []);

          useEffect(() => {
            if (!locale || typeof locale.subscribe !== 'function') return undefined;
            try {
              return locale.subscribe(() => setLocaleRev((value) => value + 1));
            } catch (err) {
              return undefined;
            }
          }, []);

          const update = (key, value) => setFields((prev) => Object.assign({}, prev, { [key]: value }));

          const doCopy = async (text) => {
            if (!text) {
              setFlash(t('emptyCopy'));
              setTimeout(() => setFlash(''), 1600);
              return;
            }
            const ok = await writeClipboard(text);
            setFlash(ok ? t('copied') : t('copyFailed'));
            setTimeout(() => setFlash(''), 1600);
          };

          const notify = (text) => {
            setFlash(text);
            setTimeout(() => setFlash(''), 2200);
          };

          const tr = (key, vars) => {
            let text = t(key);
            Object.keys(vars || {}).forEach((name) => {
              text = text.replace('{' + name + '}', String(vars[name]));
            });
            return text;
          };

          const handleSort = () => {
            const result = sortTags(fields.tags);
            setFields((prev) => Object.assign({}, prev, { tags: result.text }));
            notify(tr('sortDone', { n: result.count, dup: result.duplicates }));
          };

          const handleQualityFix = () => {
            const parts = fields.tags.split(',').map((part) => part.trim()).filter(Boolean);
            const lower = parts.map((part) => part.toLowerCase());
            ['masterpiece', 'best quality', 'score_7', 'safe'].forEach((tag) => {
              if (!lower.includes(tag)) parts.push(tag);
            });
            let negative = fields.negative;
            if (!/worst quality|low quality|score_1/i.test(negative)) {
              negative = negative ? negative + ', ' + ANIMA_NEGATIVE : ANIMA_NEGATIVE;
            }
            setFields((prev) => Object.assign({}, prev, { tags: sortTags(parts.join(', ')).text, negative }));
            notify(t('qualityFixed'));
          };

          const saveSnapshot = () => {
            const base = (fields.subject || fields.tags || 'untitled').slice(0, 60);
            const item = {
              id: Date.now(),
              time: new Date().toLocaleString(),
              presetId,
              title: base,
              fields: Object.assign({}, fields),
            };
            const next = [item].concat(history).slice(0, 20);
            setHistory(next);
            try {
              if (typeof localStorage !== 'undefined') localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
            } catch (err) {
              /* ignore */
            }
            notify(t('snapshotSaved'));
          };

          const restoreSnapshot = (item) => {
            if (!item || !item.fields) return;
            setFields(Object.assign({}, EMPTY, item.fields));
            if (PRESETS.some((preset) => preset.id === item.presetId)) setPresetId(item.presetId);
            setHistoryOpen(false);
          };

          const deleteSnapshot = (id) => {
            const next = history.filter((item) => item.id !== id);
            setHistory(next);
            try {
              if (typeof localStorage !== 'undefined') localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
            } catch (err) {
              /* ignore */
            }
          };

          const shotlistStyle = preset.id === 'h3_image_realistic' ? 'realistic' : 'comic_drama';
          const shotImageSize = preset.id === 'h3_image_realistic' ? { width: 2560, height: 1440 } : { width: 1280, height: 736 };
          const defaultExportName = () => {
            const ext = exportFormat === 'txt' ? 'txt' : 'json';
            const base = (exportName || '').trim() || ('prompt_' + preset.id + '_' + Date.now());
            return /\.[a-z0-9]+$/i.test(base) ? base : base + '.' + ext;
          };
          const buildExport = () => {
            if (exportFormat === 'txt') {
              return [
                '# Anima Prompt Studio export',
                '# preset: ' + preset.id,
                '# settings: ' + t(preset.settingsKey),
                '# tags: ' + fields.tags,
                '',
                positive,
                '',
                'Negative:',
                negative,
                '',
              ].join('\n');
            }
            if (exportFormat === 'json') {
              return JSON.stringify({
                schema: 'h3.prompt/v1',
                exportedAt: new Date().toISOString(),
                preset: preset.id,
                positive,
                negative,
                settings: t(preset.settingsKey),
                fields: Object.assign({}, fields),
              }, null, 2);
            }
            const scene = {
              shot_id: exportShot.trim() || 'S01',
              duration_s: 4,
              aspect: '16:9',
              image: {
                backend: preset.id === 'h3_image_realistic' ? 'h3_image' : 'anima',
                prompt: positive,
                tags: fields.tags,
                width: shotImageSize.width,
                height: shotImageSize.height,
                seeds: [1],
              },
              video: {
                mode: 'i2v',
                prompt: fields.subject || positive,
                duration_s: 4,
                steps: 8,
                seed: 1,
                first_frame: (exportShot.trim() || 'S01') + '_frame.png',
              },
              panel: { camera: 'still', hold_s: 4, subtitle: '', narration: '', transition: 'cut' },
              audio: { mode: 'h3_native' },
            };
            return JSON.stringify({
              schema: 'h3.shotlist/v2',
              project_id: exportProject.trim() || 'prompt_studio',
              pipeline: 'drama',
              style: shotlistStyle,
              format: { aspect: '16:9', width: 1920, height: 1080, fps: 24 },
              scenes: [scene],
            }, null, 2);
          };

          const copyExport = async () => {
            const ok = await writeClipboard(buildExport());
            notify(ok ? t('copiedContent') : t('copyFailed'));
          };

          const downloadExport = () => {
            try {
              const blob = new Blob([buildExport()], { type: 'text/plain;charset=utf-8' });
              const url = URL.createObjectURL(blob);
              const anchor = document.createElement('a');
              anchor.href = url;
              anchor.download = defaultExportName();
              document.body.appendChild(anchor);
              anchor.click();
              document.body.removeChild(anchor);
              URL.revokeObjectURL(url);
              notify(tr('exportedTo', { name: defaultExportName() }));
            } catch (err) {
              notify(tr('exportFailed', { err: String(err && err.message ? err.message : err) }));
            }
          };

          const writeToDirectory = async (handle) => {
            const name = defaultExportName();
            const fileHandle = await handle.getFileHandle(name, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write(buildExport());
            await writable.close();
            notify(tr('exportedTo', { name }));
          };

          const exportToFolder = async () => {
            if (typeof window === 'undefined' || typeof window.showDirectoryPicker !== 'function') {
              notify(t('folderUnsupported'));
              return;
            }
            try {
              const handle = await window.showDirectoryPicker({ mode: 'readwrite' });
              setDirHandle(handle);
              await writeToDirectory(handle);
            } catch (err) {
              if (err && err.name === 'AbortError') return;
              notify(tr('exportFailed', { err: String(err && err.message ? err.message : err) }));
            }
          };

          const exportAgain = async () => {
            if (!dirHandle) return;
            try {
              await writeToDirectory(dirHandle);
            } catch (err) {
              notify(tr('exportFailed', { err: String(err && err.message ? err.message : err) }));
            }
          };

          const checks = h(
            'section',
            { className: 'ps-checks', 'aria-label': t('checksTitle') },
            h('h4', { className: 'ps-panel-title' }, t('checksTitle')),
            h('div', { className: 'ps-panel-body' },
              issues.length === 0
                ? h('div', { className: 'ps-check ps-ok' },
                    h('span', { className: 'ps-check-marker', 'aria-hidden': true }, '✓'),
                    t('checkOk')
                  )
                : issues.map((issue, index) =>
                    h('div', { key: issue.key + index, className: issue.level === 'warn' ? 'ps-check ps-warn' : 'ps-check' },
                      h('span', { className: 'ps-check-marker', 'aria-hidden': true }, issue.level === 'warn' ? '!' : 'i'),
                      h('span', null, t(issue.key) + (issue.extra ? ': ' + issue.extra : ''))
                    )
                  )
            )
          );

          const header = h(
            'header',
            { className: 'ps-head' },
            h('div', { className: 'ps-title' },
              h('span', { className: 'ps-workbench-icon', 'aria-hidden': true }, '>_'),
              h('h2', null, t('panelTitle')),
              h('span', { role: 'status', className: flash && /失败|failed/i.test(flash) ? 'ps-flash ps-bad' : 'ps-flash' }, flash)
            ),
            h('div', { className: 'ps-head-actions' },
              h('label', { className: 'ps-preset' },
                h('span', null, t('presetLabel')),
                h('select',
                  { value: presetId, onChange: (event) => setPresetId(event.target.value) },
                  PRESETS.map((item) => h('option', { key: item.id, value: item.id }, t(item.labelKey)))
                )
              ),
              h('button', { type: 'button', onClick: () => setFields(Object.assign({}, EMPTY)) }, t('clear')),
              h('button', { type: 'button', onClick: () => setPresetId(PRESETS[0].id) }, t('restorePreset'))
            )
          );

          const examples = h(
            'div',
            { className: 'ps-examples' },
            h('span', { className: 'ps-row-label' }, t('examplesTitle')),
            EXAMPLES.map((example) =>
              h('button', {
                key: example.id,
                type: 'button',
                className: 'ps-chip',
                onClick: () => setFields(Object.assign({}, EMPTY, example.fields)),
              }, t(example.labelKey))
            )
          );

          const historyPanel = historyOpen
            ? h(
                'section',
                { className: 'ps-panel', id: 'ps-history-panel', 'aria-label': t('history') },
                h('h4', { className: 'ps-panel-title' }, t('history')),
                h('div', { className: 'ps-panel-body' },
                  history.length === 0
                    ? h('div', { className: 'ps-mini' }, t('historyEmpty'))
                    : history.map((item) =>
                        h('div', { key: item.id, className: 'ps-history-row' },
                          h('button', { type: 'button', className: 'ps-history-main', onClick: () => restoreSnapshot(item) },
                            h('span', { className: 'ps-history-title' }, item.title),
                            h('span', { className: 'ps-mini' }, item.time || '')
                          ),
                          h('button', { type: 'button', className: 'ps-chip', onClick: () => deleteSnapshot(item.id) }, t('delete'))
                        )
                      )
                )
              )
            : null;

          const exportPanel = exportOpen
            ? h(
                'section',
                { className: 'ps-panel', id: 'ps-export-panel', 'aria-label': t('exportTitle') },
                h('h4', { className: 'ps-panel-title' }, t('exportTitle')),
                h('div', { className: 'ps-panel-body' },
                  h('div', { className: 'ps-row' },
                    h('label', { className: 'ps-export-field' },
                      h('span', { className: 'ps-mini' }, t('exportFormat')),
                      h('select', { value: exportFormat, onChange: (event) => setExportFormat(event.target.value) },
                        h('option', { value: 'txt' }, t('exportText')),
                        h('option', { value: 'json' }, t('exportJson')),
                        h('option', { value: 'shotlist' }, t('exportShotlist'))
                      )
                    ),
                    h('label', { className: 'ps-export-field' },
                      h('span', { className: 'ps-mini' }, t('exportName')),
                      h('input', {
                        className: 'ps-export-name',
                        value: exportName,
                        placeholder: defaultExportName(),
                        onChange: (event) => setExportName(event.target.value),
                      })
                    )
                  ),
                  exportFormat === 'shotlist'
                    ? h('div', { className: 'ps-row' },
                        h('label', { className: 'ps-export-field' },
                          h('span', { className: 'ps-mini' }, t('projectId')),
                          h('input', { className: 'ps-export-name', value: exportProject, onChange: (event) => setExportProject(event.target.value) })
                        ),
                        h('label', { className: 'ps-export-field' },
                          h('span', { className: 'ps-mini' }, t('shotId')),
                          h('input', { className: 'ps-export-name', value: exportShot, onChange: (event) => setExportShot(event.target.value) })
                        )
                      )
                    : null,
                  h('pre', { className: 'ps-export-preview', tabIndex: 0 }, buildExport().slice(0, 900)),
                  h('div', { className: 'ps-row ps-panel-actions' },
                    h('button', { type: 'button', onClick: copyExport }, t('copyContent')),
                    h('button', { type: 'button', className: 'ps-primary', onClick: downloadExport }, t('downloadFile')),
                    h('button', { type: 'button', onClick: exportToFolder }, t('exportFolder')),
                    dirHandle
                      ? h('button', { type: 'button', onClick: exportAgain }, t('exportTitle') + ' ↻')
                      : null
                  ),
                  h('div', { className: 'ps-mini' }, t('exportFolderHint'))
                )
              )
            : null;

          const left = h(
            'section',
            { className: 'ps-editor-group', 'aria-label': t('tagLabel') },
            h(CodeEditor, {
              t,
              label: t('tagLabel'),
              value: fields.tags,
              onChange: (value) => update('tags', value),
              placeholder: t('tagPlaceholder'),
              quickTags: QUICK_TAGS.slice(0, 6),
            }),
            h('div', { className: 'ps-toolbar' },
              h('button', { type: 'button', onClick: handleSort }, t('sortTags')),
              h('button', { type: 'button', onClick: handleQualityFix }, t('qualityFix')),
              h('button', { type: 'button', onClick: saveSnapshot }, t('saveSnapshot')),
              h('button', {
                type: 'button',
                'aria-controls': 'ps-history-panel',
                'aria-expanded': historyOpen,
                onClick: () => setHistoryOpen((value) => !value),
              }, t('history') + (history.length ? ' (' + history.length + ')' : '')),
              h('button', {
                type: 'button',
                'aria-controls': 'ps-export-panel',
                'aria-expanded': exportOpen,
                onClick: () => setExportOpen((value) => !value),
              }, t('exportTitle'))
            ),
            historyPanel,
            exportPanel,
            h('div', { className: 'ps-tools' },
              h('div', { className: 'ps-row' },
                h('span', { className: 'ps-row-label' }, t('characterTags')),
                CHARACTER_TAGS.slice(0, 8).map((tag) =>
                  h('button', {
                    key: tag,
                    type: 'button',
                    className: 'ps-chip',
                    onClick: () => update('tags', [clean(fields.tags), tag].filter(Boolean).join(', ')),
                  }, tag)
                )
              ),
              h('div', { className: 'ps-field' },
                h('label', { className: 'ps-field-label', htmlFor: 'ps-artist' }, t('artistLabel')),
                h('input', {
                  id: 'ps-artist',
                  className: 'ps-artist-input',
                  value: fields.artist,
                  list: 'ps-artist-list',
                  placeholder: t('artistPlaceholder'),
                  spellCheck: false,
                  onChange: (event) => update('artist', event.target.value),
                }),
                h('datalist', { id: 'ps-artist-list' },
                  ARTIST_TAGS.slice(0, 120).map((artist) => h('option', { key: artist, value: artist.replace(/^@/, '') }))
                )
              ),
              h('div', { className: 'ps-row' },
                h('span', { className: 'ps-row-label' }, t('quickArtists')),
                ARTIST_TAGS.slice(0, 8).map((artist) =>
                  h('button', { key: artist, type: 'button', className: 'ps-chip', onClick: () => update('artist', artist.replace(/^@/, '')) }, artist)
                )
              ),
              h('details', { className: 'ps-details' },
                h('summary', null, t('moreFields')),
                h('div', { className: 'ps-fields' },
                  h(Field, { label: t('subjectLabel'), value: fields.subject, onChange: (v) => update('subject', v), placeholder: t('subjectPlaceholder') }),
                  h(Field, { label: t('sceneLabel'), value: fields.scene, onChange: (v) => update('scene', v), placeholder: t('scenePlaceholder') }),
                  h(Field, { label: t('lightLabel'), value: fields.light, onChange: (v) => update('light', v), placeholder: t('lightPlaceholder') }),
                  h(Field, { label: t('freeLabel'), value: fields.free, onChange: (v) => update('free', v), placeholder: t('freePlaceholder') }),
                  h('div', { className: 'ps-negative-field' },
                    h(CodeEditor, {
                      label: t('negativeLabel'),
                      value: fields.negative,
                      onChange: (v) => update('negative', v),
                      placeholder: t('negativePlaceholder'),
                      t,
                      negative: true,
                    })
                  )
                )
              ),
              examples
            )
          );

          const right = h(
            'aside',
            { className: 'ps-preview-card', 'aria-label': t('previewTitle') },
            h('div', { className: 'ps-tabs' },
              h('span', { className: 'ps-file-tab' }, t('previewTitle'))
            ),
            h(PreviewFile, { title: t('previewLabel'), text: positive, copyLabel: t('copyPositive'), onCopy: () => doCopy(positive) }),
            h(PreviewFile, { title: t('negativePreviewLabel'), text: negative, negative: true, copyLabel: t('copyNegative'), onCopy: () => doCopy(negative) }),
            h('div', { className: 'ps-status' },
              positive.length + ' ' + t('chars') + ' · ' + t('estTokens') + ' ' + Math.ceil(positive.length / 4)
            ),
            h(Legend, { chinese: activeLocale(locale).startsWith('zh') }),
            checks,
            h('div', { className: 'ps-settings' }, t(preset.settingsKey))
          );

          return h(
            'div',
            { className: 'ps-root ps-page' },
            h('style', null, CSS),
            header,
            h('div', { className: 'ps-layout' }, left, right),
            h('footer', { className: 'ps-footer ps-mini' }, t('hintFooter'))
          );
        }

        function PromptStudioPage() {
          return h(StudioBoundary, null, h(PromptStudio));
        }

        function StudioIcon(props) {
          const size = props && props.size ? props.size : 20;
          const active = !(props && props.active === false);
          return h(
            'svg',
            {
              width: size,
              height: size,
              viewBox: '0 0 64 64',
              'aria-hidden': 'true',
              focusable: 'false',
              style: { display: 'block', opacity: active ? 1 : 0.7 },
            },
            h('path', { d: 'M16 44c8-2 14-8 20-22l6 3c-6 14-13 22-22 26l-2-7z', fill: 'currentColor', opacity: 0.9 }),
            h('path', { d: 'M40 15l7 3-2 6-7-3 2-6z', fill: 'currentColor' }),
            h('path', { d: 'M14 50h26', stroke: 'currentColor', strokeWidth: 4, strokeLinecap: 'round', fill: 'none' }),
            h('path', { d: 'M47 10l1.8 4.2L53 16l-4.2 1.8L47 22l-1.8-4.2L41 16l4.2-1.8L47 10z', fill: 'currentColor', opacity: 0.85 })
          );
        }

        ctx.slots.inject('main', () =>
          ctx.slots.register({ name: 'main', key: 'prompt-studio' }, PromptStudioPage)
        );

        ctx.slots.inject('sidebar.panellist', () =>
          ctx.slots.register(
            { name: 'sidebar.panellist', id: 'prompt-studio', order: 5, label: () => t('panelTitle') },
            StudioIcon
          )
        );
      },
    };
  },
});
