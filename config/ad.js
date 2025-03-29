const ads = [
    {
        title: "USF文档--你的实用指南",
        description: "功能介绍，使用方法，常见问题，以及更多。",
        buttonText: "让我康康！",
        buttonLink: "https://usfpack.site",
        type: "community",
        isAd: false, // 不是广告,是推荐
        badgeText: "推荐" // 自定义标签
    },
    {
        title: "USFLog Plus",
        description: "一款实用的USF日志后端程序，提升服主管理效率",
        buttonText: "了解更多",
        buttonLink: "https://usflogplus.zuyst.top",
        type: "tool",
        isAd: true,
        badgeText: "推荐工具"
    },
    {
        title: "广告位招商",
        description: "这里是广告位置，赞助后您的服务有机会登上首页！",
        buttonText: "暂未开放",
        buttonLink: "#",
        type: "ad",
        isAd: true,
        badgeText: ""
    }
];

// 随机抽一个
function getRandomAd() {
    return ads[Math.floor(Math.random() * ads.length)];
}
