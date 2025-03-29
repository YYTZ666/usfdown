// 数据config
const files = [
   {
        name: "USF0.7.2C",
        description: "修复了上个版本传送功能无法正常运作的问题。更多信息请点击详情。",
        changelog: [
            "修复了上个版本传送功能无法正常运作的问题。",
        ],
        contributors: [
            "USF开发团队",
            "XiaoXiaoYang",
            "Antonbin"
        ],
        supportVersions: ["1.21.70"],
        releaseDate: "2025-03-30",
        tags: ["测试版", "1.21"],
        downloadLink: "/files/main/USF0.7.2C.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
    },
   {
        name: "USF0.7.1C",
        description: "作者宣布停更后的第一个社区维护版本。适配1.21.70.此版本存在功能缺陷更多信息请点击详情。",
        changelog: [
            "1. 增加出入领地时的玩家游戏模式切换",
            "2. 修复了一些已知问题",
            "3. 适配1.21.70版本"
        ],
        contributors: [
            "USF开发团队",
            "XiaoXiaoYang"
        ],
        supportVersions: ["1.21.70"],
        releaseDate: "2025-03-27",
        tags: ["测试版", "1.21"],
        downloadLink: "/files/main/0.7.1C.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        importantTip: "此版本传送功能存在缺陷，请使用更新版本（0.7.2C)"
    },
   {
        name: "USF0.6.35B",
        description: "适配1.21.60。",
        changelog: [
            "1. 适配1.21.60版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.21.60"],
        tags: ["正式版", "1.21"],
        downloadLink: "/files/main/0.6.35B.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
        
    },
    
    {
        name: "USF0.6.34B",
        description: "适配1.21.5X。",
        changelog: [
            "1. 适配1.21.5X版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.21.5X"],
        tags: ["正式版", "1.21"],
        downloadLink: "/files/main/0.6.34B.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    
    {
        name: "USF0.6.33B",
        description: "适配1.21.40-1.21.42。",
        changelog: [
            "1. 适配1.21.40-1.21.42版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.21.40", "1.21.42"],
        tags: ["正式版", "1.21"],
        downloadLink: "/files/main/0.6.33B.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "USF0.6.32B",
        description: "适配1.21.30",
        changelog: [
            "1. 适配1.21.30版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.21.30","1.21.31"],
        tags: ["正式版", "1.21"],
        downloadLink: "/files/main/0.6.32B.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "USF0.6.31(S）",
        description: "适配1.21.31",
        changelog: [
            "1. 适配1.21.31版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.21.31"],
        tags: ["正式版", "1.21"],
        downloadLink: "/files/main/0.6.31S.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "USF0.6.30(S)",
        description: "适配1.21.30（测试版）。修复了一些bug。",
        changelog: [
            "1. 适配1.21.30版本",
            "2. 修复了一些bug"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.21.30"],
        tags: ["正式版", "1.21"],
        downloadLink: "/files/main/0.6.30S.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "USF0.6.29(B)",
        description: "适配1.21.0-.1.21.2。增加了功能，修复了若干bug，详细信息请查看压缩包内日志。",
        changelog: [
            "1. 适配1.21.0-1.21.2版本",
            "2. 增加了新功能",
            "3. 修复了若干bug"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.21.0", "1.21.2"],
        tags: ["正式版", "1.21"],
        downloadLink: "/files/main/0.6.29B.zip",
        feedbackLink: "#"
    },
    {
        name: "USF0.6.28(B）",
        description: "适配1.21.0-.1.21.2。修复了部分功能逻辑，修复了若干bug，详细信息请查看压缩包内日志。",
        changelog: [
            "1. 适配1.21.0-1.21.2版本",
            "2. 修复了部分功能逻辑",
            "3. 修复了若干bug"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.21.0", "1.21.2"],
        tags: ["正式版", "1.21"],
        downloadLink: "/files/main/0.6.28B.zip",
        feedbackLink: "#"
    },
    {
        name: "USF0.6.27(F）",
        description: "适配1.21.0-.1.21.2。修复了若干bug，详细信息请查看压缩包内日志。",
        changelog: [
            "1. 适配1.21.0-1.21.2版本",
            "2. 修复了若干bug"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.21.0", "1.21.2"],
        tags: ["正式版", "1.21"],
        downloadLink: "/files/main/0.6.27F.zip",
        feedbackLink: "#"
    },
    {
        name: "USF0.6.26(B）",
        description: "适配1.21.0-.1.21.2。增加了新功能，修复了若干bug，详细信息请查看压缩包内日志。",
        changelog: [
            "1. 适配1.21.0-1.21.2版本",
            "2. 增加了新功能",
            "3. 修复了若干bug"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.21.0", "1.21.2"],
        tags: ["正式版", "1.21"],
        downloadLink: "/files/main/0.6.26B.zip",
        feedbackLink: "#"
    },
    {
        name: "USF0.6.25(B）",
        description: "适配1.21.0-.1.21.2。修复了部分功能逻辑，修复了若干bug，详细信息请查看压缩包内日志。",
        changelog: [
            "1. 适配1.21.0-1.21.2版本",
            "2. 修复了部分功能逻辑",
            "3. 修复了若干bug"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.21.0", "1.21.2"],
        tags: ["正式版", "1.21"],
        downloadLink: "/files/main/0.6.25B.zip",
        feedbackLink: "#"
    },
    {
        name: "USF0.6.24(F）",
        description: "适配1.21.0-.1.21.2。修复了部分功能逻辑，修复了若干bug，详细信息请查看压缩包内日志。",
        changelog: [
            "1. 适配1.21.0-1.21.2版本",
            "2. 修复了部分功能逻辑",
            "3. 修复了若干bug"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.21.0", "1.21.2"],
        tags: ["正式版", "1.21"],
        downloadLink: "/files/main/0.6.24F.zip",
        feedbackLink: "#"
    },
    {
        name: "USF0.6.23E",
        description: "适配1.21.0-1.21.1-1.21.2",
        changelog: [
            "1. 适配1.21.0-1.21.2版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.21.0", "1.21.1", "1.21.2"],
        tags: ["正式版", "1.21"],
        downloadLink: "/files/main/0.6.23E.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "USF0.6.22B",
        description: "适配1.21.0-1.21.1-1.21.2",
        changelog: [
            "1. 适配1.21.0-1.21.2版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.21.0", "1.21.1", "1.21.2"],
        tags: ["正式版", "1.21"],
        downloadLink: "/files/main/0.6.22B.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "USF0.6.21B",
        description: "适配1.21.0-1.21.1-1.21.2",
        changelog: [
            "1. 适配1.21.0-1.21.2版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.21.0", "1.21.1", "1.21.2"],
        tags: ["正式版", "1.21"],
        downloadLink: "/files/main/0.6.21B.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "USF0.6.20",
        description: "适配1.21.0-1.21.1",
        changelog: [
            "1. 适配1.21.0-1.21.1版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.21.0", "1.21.1"],
        tags: ["正式版", "1.21"],
        downloadLink: "/files/main/0.6.20.mcpack",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "USF0.6.19.1",
        description: "适配1.21.0-1.21.1",
        changelog: [
            "1. 适配1.21.0-1.21.1版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.21.0", "1.21.1"],
        tags: ["正式版", "1.21"],
        downloadLink: "/files/main/0.6.19.1.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "USF0.6.19",
        description: "适配1.21.0-1.21.1",
        changelog: [
            "1. 适配1.21.0-1.21.1版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.21.0", "1.21.1"],
        tags: ["正式版", "1.21"],
        downloadLink: "/files/main/0.6.19.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "USF0.6.18.5-USF1.21.0正式版行为包",
        description: "适配1.21.0",
        changelog: [
            "1. 适配1.21.0版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.21.0"],
        tags: ["正式版", "1.21"],
        downloadLink: "file/main/USF1.21.0正式版行为包.mcpack",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "USF0.6.18.1",
        description: "适配1.20.80",
        changelog: [
            "1. 适配1.20.80版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.20.80"],
        tags: ["正式版", "1.20"],
        downloadLink: "/files/main/[指令凋灵修改（适配1.20.80）]无名氏B-0.6.18.mcpack",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "USF0.6.18",
        description: "适配1.20.50/60",
        changelog: [
            "1. 适配1.20.50/60版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.20.50", "1.20.60"],
        tags: ["正式版", "1.20"],
        downloadLink: "/files/main/0-6-18B.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "USF0.6.17B-F",
        description: "适配1.20.50/60",
        changelog: [
            "1. 适配1.20.50/60版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.20.50", "1.20.60"],
        tags: ["正式版", "1.20"],
        downloadLink: "/files/main/0.6.17B-F.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "USF0.6.16B",
        description: "适配1.20.50/60",
        changelog: [
            "1. 适配1.20.50/60版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.20.50", "1.20.60"],
        tags: ["正式版", "1.20"],
        downloadLink: "/files/main/0.6.16B.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "USF0.6.15B",
        description: "适配1.20.50/60",
        changelog: [
            "1. 适配1.20.50/60版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.20.50", "1.20.60"],
        tags: ["正式版", "1.20"],
        downloadLink: "/files/main/0.6.15B.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "USF0.6.14F",
        description: "适配1.20.50/60",
        changelog: [
            "1. 适配1.20.50/60版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.20.50", "1.20.60"],
        tags: ["正式版", "1.20"],
        downloadLink: "/files/main/0.6.14F.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "USF0.6.13B",
        description: "适配1.20.50/60",
        changelog: [
            "1. 适配1.20.50/60版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.20.50", "1.20.60"],
        tags: ["正式版", "1.20"],
        downloadLink: "/files/main/0.6.13B.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "USF0.6.12E",
        description: "适配1.20.50/51",
        changelog: [
            "1. 适配1.20.50/51版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.20.50", "1.20.51"],
        tags: ["正式版", "1.20"],
        downloadLink: "/files/main/0.6.12E.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "USF0.6.11E",
        description: "适配1.20.50/51",
        changelog: [
            "1. 适配1.20.50/51版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.20.50", "1.20.51"],
        tags: ["正式版", "1.20"],
        downloadLink: "/files/main/0.6.11E.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "V1-USF0.6.8E",
        description: "适配1.20.50/51",
        changelog: [
            "1. 适配1.20.50/51版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.20.50", "1.20.51"],
        tags: ["正式版", "1.20"],
        downloadLink: "/files/main/0.6.8E.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "V1-USF0.6.7E",
        description: "适配1.20.40",
        changelog: [
            "1. 适配1.20.40版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.20.40"],
        tags: ["正式版", "1.20"],
        downloadLink: "/files/main/0.6.7E.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "V1-USF0.6.6F",
        description: "适配1.20.30",
        changelog: [
            "1. 适配1.20.30版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.20.30"],
        tags: ["正式版", "1.20"],
        downloadLink: "/files/main/0.6.6F.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "V1-USF0.6.5S",
        description: "适配1.20.30",
        changelog: [
            "1. 适配1.20.30版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.20.30"],
        tags: ["正式版", "1.20"],
        downloadLink: "/files/main/0.6.5S.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "V1-USF0.6.4B",
        description: "适配1.20.10/11/12",
        changelog: [
            "1. 适配1.20.10/11/12版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.20.10", "1.20.11", "1.20.12"],
        tags: ["正式版", "1.20"],
        downloadLink: "/files/main/0.6.4B.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "V1-USF0.6.3B",
        description: "适配1.20.10/11/12",
        changelog: [
            "1. 适配1.20.10/11/12版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.20.10", "1.20.11", "1.20.12"],
        tags: ["正式版", "1.20"],
        downloadLink: "/files/main/0.6.3B(修复bug) (1).zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "V1-USF0.6.2F",
        description: "适配1.20.10.23/24/25(测试版)",
        changelog: [
            "1. 适配1.20.10.23/24/25版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.20.10.23", "1.20.10.24", "1.20.10.25"],
        tags: ["测试版", "1.20"],
        downloadLink: "/files/main/0.6.2F.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "V1-USF0.6.1B",
        description: "适配1.20.10.21/22(测试版)",
        changelog: [
            "1. 适配1.20.10.21/22版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.20.10.21", "1.20.10.22"],
        tags: ["测试版", "1.20"],
        downloadLink: "/files/main/0.6.1.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "V1-USF0.6.0",
        description: "适配1.20.10.21/22(测试版)",
        changelog: [
            "1. 适配1.20.10.21/22版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.20.10.21", "1.20.10.22"],
        tags: ["测试版", "1.20"],
        downloadLink: "/files/main/0.6.0.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "V1-USF0.5.5S",
        description: "适配1.19.8x",
        changelog: [
            "1. 适配1.19.8x版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.19.8x"],
        tags: ["正式版", "1.19"],
        downloadLink: "/files/main/0.5.5S.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "V1-USF0.5.4B",
        description: "适配1.19.7x",
        changelog: [
            "1. 适配1.19.7x版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.19.7x"],
        tags: ["正式版", "1.19"],
        downloadLink: "/files/main/0.5.4B.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "V1-USF0.5.3B",
        description: "适配1.19.7x",
        changelog: [
            "1. 适配1.19.7x版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.19.7x"],
        tags: ["正式版", "1.19"],
        downloadLink: "/files/main/0.5.3B.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "V1-USF0.5.2B",
        description: "适配1.19.7x",
        changelog: [
            "1. 适配1.19.7x版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.19.7x"],
        tags: ["正式版", "1.19"],
        downloadLink: "/files/main/0.5.2B.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "V1-USF0.5.1B",
        description: "适配1.19.7x",
        changelog: [
            "1. 适配1.19.7x版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.19.7x"],
        tags: ["正式版", "1.19"],
        downloadLink: "/files/main/0.5.1B.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "V1-USF0.4.2F",
        description: "适配1.19.6x",
        changelog: [
            "1. 适配1.19.6x版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.19.6x"],
        tags: ["正式版", "1.19"],
        downloadLink: "/files/main/0.4.2.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "V1-USF0.4.1F",
        description: "适配1.19.6x",
        changelog: [
            "1. 适配1.19.6x版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.19.6x"],
        tags: ["正式版", "1.19"],
        downloadLink: "/files/main/0.4.1.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "V1-USF0.3.3",
        description: "适配1.19.5x",
        changelog: [
            "1. 适配1.19.5x版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.19.5x"],
        tags: ["正式版", "1.19"],
        downloadLink: "/files/main/0.3.3E.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
    {
        name: "V1-USF0.3.2B",
        description: "适配1.19.5x",
        changelog: [
            "1. 适配1.19.5x版本"
        ],
        contributors: [
            "USF开发团队"
        ],
        supportVersions: ["1.19.5x"],
        tags: ["正式版", "1.19"],
        downloadLink: "/files/main/0.3.2B.zip",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose"
    },
];
