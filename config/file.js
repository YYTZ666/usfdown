// 数据config
const files = [
   {
        name: "USF0.7.1C",
        description: "作者宣布停更后的第一个社区维护版本。适配1.21.70，增加了出入领地时的玩家游戏模式切换。此版本也有0.6.36B的别称",
        tags: ["正式版", "1.21"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.7.1C.zip"
    },
   {
        name: "USF0.6.35B",
        description: "适配1.21.60。",
        tags: ["正式版", "1.21"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.35B.zip"
    },
    
    {
        name: "USF0.6.34B",
        description: "适配1.21.5X。",
        tags: ["正式版", "1.21"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.34B.zip"
    },
    
    {
        name: "USF0.6.33B",
        description: "适配1.21.40-1.21.42。",
        tags: ["正式版", "1.21"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.33B.zip"
    },
    {
        name: "USF0.6.32B",
        description: "适配1.21.30+ 保守估计可以适配到1.22出来（只要牢微不改API）。",
        tags: ["正式版", "1.21"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.32B.zip"
    },
    {
        name: "USF0.6.31(S）",
        description: "适配1.21.31",
        tags: ["正式版", "1.21"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.31S.zip"
    },
    {
        name: "USF0.6.30(S)",
        description: "适配1.21.30（测试版）。修复了一些bug。",
        tags: ["正式版", "1.21"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.30S.zip"
    },
    {
        name: "USF0.6.29(B)",
        description: "适配1.21.0-.1.21.2。增加了功能，修复了若干bug，详细信息请查看压缩包内日志。",
        tags: ["正式版", "1.21"],
        shareLink: "#",
        feedbackLink: "#",
        downloadLink: "/files/main/0.6.29B.zip"
    },
    {
        name: "USF0.6.28(B）",
        description: "适配1.21.0-.1.21.2。修复了部分功能逻辑，修复了若干bug，详细信息请查看压缩包内日志。",
        tags: ["正式版", "1.21"],
        shareLink: "#",
        feedbackLink: "#",
        downloadLink: "/files/main/0.6.28B.zip"
    },
    {
        name: "USF0.6.27(F）",
        description: "适配1.21.0-.1.21.2。修复了若干bug，详细信息请查看压缩包内日志。",
        tags: ["正式版", "1.21"],
        shareLink: "#",
        feedbackLink: "#",
        downloadLink: "/files/main/0.6.27F.zip"
    },
    {
        name: "USF0.6.26(B）",
        description: "适配1.21.0-.1.21.2。增加了新功能，修复了若干bug，详细信息请查看压缩包内日志。",
        tags: ["正式版", "1.21"],
        shareLink: "#",
        feedbackLink: "#",
        downloadLink: "/files/main/0.6.26B.zip"
    },
    {
        name: "USF0.6.25(B）",
        description: "适配1.21.0-.1.21.2。修复了部分功能逻辑，修复了若干bug，详细信息请查看压缩包内日志。",
        tags: ["正式版", "1.21"],
        shareLink: "#",
        feedbackLink: "#",
        downloadLink: "/files/main/0.6.25B.zip"
    },
    {
        name: "USF0.6.24(F）",
        description: "适配1.21.0-.1.21.2。修复了部分功能逻辑，修复了若干bug，详细信息请查看压缩包内日志。",
        tags: ["正式版", "1.21"],
        shareLink: "#",
        feedbackLink: "#",
        downloadLink: "/files/main/0.6.24F.zip"
    },
    {
        name: "USF0.6.23E",
        description: "适配1.21.0-1.21.1-1.21.2",
        tags: ["正式版", "1.21"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.23E.zip"
    },
    {
        name: "USF0.6.22B",
        description: "适配1.21.0-1.21.1-1.21.2",
        tags: ["正式版", "1.21"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.22B.zip"
    },
    {
        name: "USF0.6.21B",
        description: "适配1.21.0-1.21.1-1.21.2",
        tags: ["正式版", "1.21"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.21B.zip"
    },
    {
        name: "USF0.6.20",
        description: "适配1.21.0-1.21.1",
        tags: ["正式版", "1.21"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.20.mcpack"
    },
    {
        name: "USF0.6.19.1",
        description: "适配1.21.0-1.21.1",
        tags: ["正式版", "1.21"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.19.1.zip"
    },
    {
        name: "USF0.6.19",
        description: "适配1.21.0-1.21.1",
        tags: ["正式版", "1.21"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.19.zip"
    },
    {
        name: "USF0.6.18.5-USF1.21.0正式版行为包",
        description: "适配1.21.0",
        tags: ["正式版", "1.21"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "file/main/USF1.21.0正式版行为包.mcpack"
    },
    {
        name: "USF0.6.18.1",
        description: "适配1.20.80",
        tags: ["正式版", "1.20"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/[指令凋灵修改（适配1.20.80）]无名氏B-0.6.18.mcpack"
    },
    {
        name: "USF0.6.18",
        description: "适配1.20.50/60",
        tags: ["正式版", "1.20"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0-6-18B.zip"
    },
    {
        name: "USF0.6.17B-F",
        description: "适配1.20.50/60",
        tags: ["正式版", "1.20"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.17B-F.zip"
    },
    {
        name: "USF0.6.16B",
        description: "适配1.20.50/60",
        tags: ["正式版", "1.20"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.16B.zip"
    },
    {
        name: "USF0.6.15B",
        description: "适配1.20.50/60",
        tags: ["正式版", "1.20"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.15B.zip"
    },
    {
        name: "USF0.6.14F",
        description: "适配1.20.50/60",
        tags: ["正式版", "1.20"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.14F.zip"
    },
    {
        name: "USF0.6.13B",
        description: "适配1.20.50/60",
        tags: ["正式版", "1.20"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.13B.zip"
    },
    {
        name: "USF0.6.12E",
        description: "适配1.20.50/51",
        tags: ["正式版", "1.20"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.12E.zip"
    },
    {
        name: "USF0.6.11E",
        description: "适配1.20.50/51",
        tags: ["正式版", "1.20"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.11E.zip"
    },
    {
        name: "V1-USF0.6.8E",
        description: "适配1.20.50/51",
        tags: ["正式版", "1.20"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.8E.zip"
    },
    {
        name: "V1-USF0.6.7E",
        description: "适配1.20.40",
        tags: ["正式版", "1.20"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.7E.zip"
    },
    {
        name: "V1-USF0.6.6F",
        description: "适配1.20.30",
        tags: ["正式版", "1.20"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.6F.zip"
    },
    {
        name: "V1-USF0.6.5S",
        description: "适配1.20.30",
        tags: ["正式版", "1.20"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.5S.zip"
    },
    {
        name: "V1-USF0.6.4B",
        description: "适配1.20.10/11/12",
        tags: ["正式版", "1.20"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.4B.zip"
    },
    {
        name: "V1-USF0.6.3B",
        description: "适配1.20.10/11/12",
        tags: ["正式版", "1.20"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.3B(修复bug) (1).zip"
    },
    {
        name: "V1-USF0.6.2F",
        description: "适配1.20.10.23/24/25(测试版)",
        tags: ["测试版", "1.20"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.2F.zip"
    },
    {
        name: "V1-USF0.6.1B",
        description: "适配1.20.10.21/22(测试版)",
        tags: ["测试版", "1.20"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.1.zip"
    },
    {
        name: "V1-USF0.6.0",
        description: "适配1.20.10.21/22(测试版)",
        tags: ["测试版", "1.20"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.6.0.zip"
    },
    {
        name: "V1-USF0.5.5S",
        description: "适配1.19.8x",
        tags: ["正式版", "1.19"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.5.5S.zip"
    },
    {
        name: "V1-USF0.5.4B",
        description: "适配1.19.7x",
        tags: ["正式版", "1.19"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.5.4B.zip"
    },
    {
        name: "V1-USF0.5.3B",
        description: "适配1.19.7x",
        tags: ["正式版", "1.19"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.5.3B.zip"
    },
    {
        name: "V1-USF0.5.2B",
        description: "适配1.19.7x",
        tags: ["正式版", "1.19"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.5.2B.zip"
    },
    {
        name: "V1-USF0.5.1B",
        description: "适配1.19.7x",
        tags: ["正式版", "1.19"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.5.1B.zip"
    },
    {
        name: "V1-USF0.4.2F",
        description: "适配1.19.6x",
        tags: ["正式版", "1.19"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.4.2.zip"
    },
    {
        name: "V1-USF0.4.1F",
        description: "适配1.19.6x",
        tags: ["正式版", "1.19"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.4.1.zip"
    },
    {
        name: "V1-USF0.3.3",
        description: "适配1.19.5x",
        tags: ["正式版", "1.19"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.3.3E.zip"
    },
    {
        name: "V1-USF0.3.2B",
        description: "适配1.19.5x",
        tags: ["正式版", "1.19"],
        shareLink: "#",
        feedbackLink: "https://github.com/YYTZ666/usfdown/issues/new/choose",
        downloadLink: "/files/main/0.3.2B.zip"
    },
];
