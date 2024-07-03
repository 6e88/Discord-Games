const { Client, MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");

const c = new Client({ intents: 3276799 });

const fs = require('fs');
const { prefix, token, channel, clientId, channels } = require("./versa.json");
let points = JSON.parse(fs.readFileSync('./points.json', 'utf-8'));

c.on("ready", async () => {
console.log("ready");
    c.user.setActivity("#help | #اوامر", { type: 'LISTENING' });
    c.user.setStatus("dnd")
});


c.on("messageCreate", async message => {
if(channel.includes(message.channel.id) && !message.author.bot) {
const args = message.content;
    const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
    .setTitle("New Suggestion")
    .setDescription(`**${args}**`)
        .setColor("#40A768")
    .setTimestamp();
    const mag = await message.channel.send({ embeds: [embed] });
    mag.react("✅");
    mag.react("❌");
message.delete();
await message.author.send("**اشكرك على الاقتراح يقلبي <:emoji_40:1255135297532989500>**")
}
});

c.on("messageCreate", async (message) => {
    if (channels.includes(message.channel.id)) {
        await message.react("⭐");
        await message.author.send("**اشكرك على الرأي يقلبي <:emoji_40:1255135297532989500>**")
    }
});

c.on("messageCreate", message => {
    if (message.content.startsWith(prefix) && (message.content.includes("help") || message.content.includes("اوامر"))) {
const row = new MessageActionRow()
.addComponents(
new MessageSelectMenu()
    .setCustomId("select")
    .addOptions([
        {
label: "اوامر العامة",
            description: "اضغط هنا لرؤية الاوامر العامة",
            emoji: "<:New_Project_20:1255239614038282351>",
            value: "1"
},
        {
label: "اوامر الادمن",
            description: "اضغط هنا لرؤية اوامر الادمن",
            emoji: "<:42:1255239303617974303>",
            value: "2"
}
    ])
)

const embed = new MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`**See the commands below, let your server more fun with Rovex
يرجى اختيار من القائمة فئة لاظهار الاوامر الخاصة بها**`)
.setFooter(`- Requested By: ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setColor("#40A768")
    .setThumbnail(message.guild.iconURL({ dynamic: true }))

const ro = new MessageActionRow()
.addComponents(
new MessageButton()
    .setEmoji("<:rovex:1255515075800993853>")
    .setStyle("SECONDARY")
    .setCustomId("1")
)
message.channel.send({ content: `${message.author}`, components: [row, ro], embeds: [embed] })
    }
});

c.on("interactionCreate", async message => {
if(!message.isSelectMenu()) return;
    if(message.values == "1"){
        const embed = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`**${prefix}points - ${prefix}نقاط\n${prefix}top - ${prefix}توب\n${prefix}cut - ${prefix}كت\n${prefix}fzora - ${prefix}فزورة\n${prefix}fkk - ${prefix}فكك\n${prefix}puzzle - ${prefix}لغز**`)
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setColor("#40A768")
.setFooter(`- Requested By: ${message.user.username}`, message.user.displayAvatarURL({ dynamic: true }))
message.update({ embeds: [embed] })
} else if(message.values == "2"){
    const embed = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setDescription(`**${prefix}rest - ${prefix}rest-all\n${prefix}give - ${prefix}remove**`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setColor("#40A768")
.setFooter(`- Requested By: ${message.user.username}`, message.user.displayAvatarURL({ dynamic: true }))
    message.update({ embeds: [embed] })
}
});


c.on("messageCreate", async message => {
    if (message.content.startsWith(prefix + "set-avatar")) {
        if (!message.member.permissions.has("ADMINISTRATOR")) return;
        
        const avatar = message.content.split(" ").slice(1).join(" ");
        
        if (!avatar) return message.reply("❌ Please provide a valid image link.");
        
        try {
            await c.user.setAvatar(avatar);
            message.reply(`**Bot avatar has been changed to ✅ ${avatar}**`);
        } catch (error) {
            console.error(error);
            message.reply("❌ An error occurred while changing the avatar.");
        }
    }
});

c.on('messageCreate', async message => {
    if (message.content.startsWith(prefix + 'set-banner')) {
        if (!message.member.permissions.has('ADMINISTRATOR')) return;

        const banner = message.content.split(' ').slice(1).join(' ');

        if (!banner) return message.reply('❌ Please provide a valid image link.');

        try {
            await c.user.setBanner(banner);
            message.reply(`**Bot banner has been changed to ✅ ${banner}**`);
        } catch (error) {
            console.error(error);
            message.reply('❌ An error occurred while changing the banner.');
        }
    }
});

c.on("messageCreate", async message => {
    if (message.content.startsWith(prefix + "set-name")) {
        if (!message.member.permissions.has("ADMINISTRATOR")) return;
        
        const name = message.content.split(" ").slice(1).join(" ");
        
        if (!name) return message.reply("❌ Please provide a valid name.");
        
        try {
            await c.user.setUsername(name);
            message.reply(`**Bot avatar has been changed to ✅ ${name}**`);
        } catch (error) {
            console.error(error);
            message.reply("❌ An error occurred while changing the name.");
        }
    }
});

c.on('messageCreate', async message => {
 if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === "rovex") {
    if (!args[0]) return await message.channel.send({content: `${prefix}say-embed <message>`});
    let embed = new MessageEmbed()
    .setDescription(`${args.join(" ")}`)
    .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setColor("#40A768")
    await message.channel.send({embeds: [embed]});
  }
});

c.on('messageCreate', async message => {
if (!message.content.startsWith(prefix) || message.author.bot) return;

const args = message.content.slice(prefix.length).trim().split(/ +/);
const command = args.shift().toLowerCase();

if (command === 'اضافة' || command === 'give') {
if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply('ليس لديك الصلاحيات اللازمة لاستخدام هذا الأمر.');

const user = message.mentions.users.first();
const amount = parseInt(args[1]);

if (!user || isNaN(amount)) return message.reply('الرجاء تحديد المستخدم وعدد النقاط بشكل صحيح.');

if (!points[user.id]) points[user.id] = 0;
points[user.id] += amount;

fs.writeFileSync('./points.json', JSON.stringify(points, null, 2));
message.reply(`تم إعطاء ${amount} نقطة لـ ${user.tag}. نقاطه الحالية: ${points[user.id]}`);
} else if (command === 'نقاط' || command === 'points') {
const user = message.mentions.users.first() || message.author;
if (!user) return message.reply('الرجاء تحديد المستخدم بشكل صحيح.');

const userPoints = points[user.id] || 0;
    
    const embed = new MessageEmbed()
        .setColor("#40A768")
    .setDescription(`**Revox\n \nالنقاط الحالي هو :\n${userPoints}$**`)
    .setFooter("لعرض الأوامر #اوامر | #help")
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
        const row = new MessageActionRow()
.addComponents(
new MessageButton()
    .setEmoji("<:rovex:1255515075800993853>")
    .setStyle("SECONDARY")
    .setCustomId("1")
)
message.reply({ embeds: [embed], components: [row] });
} else if (command === 'ازالة' || command === 'remove') {
if (owner.includes(message.author.id)){

const user = message.mentions.users.first();
const amount = parseInt(args[1]);

if (!user || isNaN(amount)) return message.reply('الرجاء تحديد المستخدم وعدد النقاط بشكل صحيح.');

if (!points[user.id]) points[user.id] = 0;

points[user.id] = Math.max(points[user.id] - amount, 0);

fs.writeFileSync('./points.json', JSON.stringify(points, null, 2));
message.reply(`تم إنقاص ${amount} نقطة من ${user.tag}. نقاطه الحالية: ${points[user.id]}`);
} else {
message.react("❌")
}
} else if (command === 'rest') {
if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply('ليس لديك الصلاحيات اللازمة لاستخدام هذا الأمر.');

const user = message.mentions.users.first();
if (!user) return message.reply('الرجاء تحديد المستخدم بشكل صحيح.');

points[user.id] = 0;

fs.writeFileSync('./points.json', JSON.stringify(points, null, 2));
message.reply(`تم إعادة تعيين نقاط ${user.tag}.`);
} else if (command === 'rest-all') {
if (!message.member.permissions.has('ADMINISTRATOR')) return message.reply('ليس لديك الصلاحيات اللازمة لاستخدام هذا الأمر.');

points = {};

fs.writeFileSync('./points.json', JSON.stringify(points, null, 2));
message.reply('تم إعادة تعيين نقاط الجميع.');
} else if (command === 'توب' || command === 'top') {
    const sortedPoints = Object.entries(points).sort(([, a], [, b]) => b - a);
    
    
    if (sortedPoints.length === 0) {
        const embed1 = new MessageEmbed()
        .setAuthor("أعلى لاعبين على مستوى السيرفر", message.guild.iconURL({ dynamic: true }))
        .setColor("#40A768")
        .setDescription(`**لايوجد أشخاص في التوب**`)
        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
    
    const row1 = new MessageActionRow()
.addComponents(
new MessageButton()
    .setEmoji("<:rovex:1255515075800993853>")
    .setStyle("SECONDARY")
    .setCustomId("1")
)
        message.reply({ embeds: [embed1], components: [row1] });
        return;
    }
    
    const topPoints = sortedPoints.slice(0, 10).map(([id, points], index) => {
        if (c.users.cache.get(id)) {
            return `#${index + 1} | <:Top1:1255150313417998346> ${c.users.cache.get(id).tag} \`${points}$\``;
        } 
    }).join('\n');

    const embed = new MessageEmbed()
        .setAuthor("أعلى لاعبين على مستوى السيرفر", message.guild.iconURL({ dynamic: true }))
        .setColor("#40A768")
        .setDescription(`**${topPoints}**`)
        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }))
    
    const row = new MessageActionRow()
.addComponents(
new MessageButton()
    .setEmoji("<:rovex:1255515075800993853>")
    .setStyle("SECONDARY")
    .setCustomId("1")
)

    message.reply({ embeds: [embed], components: [row] });
}
});



c.on("messageCreate", async message => {
if (message.content.startsWith(prefix) && (message.content.includes("fzora") || message.content.includes("فزورة"))) {
   
const questions = [
  {q: "من هو الصحابي الذي لُقبَ بالطيار؟", a: [`جعفر بن ابي طالب`, "جعفر بن ابي طالب"]},
    {q: "من هو الصحابي الذي لُقبَ بالسيف الله المسلول؟", a: [`خالد بن الوليد`, "خالد بن الوليد"]},
    {q: "اول غزوة بتاريخ الإسلام ماذا؟", a: [`غزوة بدر`, "غزوة بدر"]},
    {q: "من أول زوجة لرسول الله؟", a: [`خديجة بنت خويلد`, "خديجة بنت خويلد"]},
    {q: "كم عمر النبي لما تزوج السيدة خديجة؟", a: [`25 عام`, "25 عام"]},
    {q: "من احب زوجة لرسول الله؟", a: [`عائشة بنت ابي بكر`, "عائشة بنت ابي بكر"]},
    {q: "من أول من أسلم بالرجال؟", a: [`ابو بكر الصديق`, "ابو بكر الصديق"]},
    {q: "من اول شخص الذي صنع السفن؟", a: [`نوح عليه السلام`, "نوح عليه السلام"]},
    {q: "من الشخص الذي لُقب بالفاروق", a: ["عمر بن الخطاب", `عمر بن الخطاب`]},
]

  
  const question = questions[Math.floor(Math.random() * questions.length)];
    
    const embed = new MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
    .setColor("#40A768")
      .setDescription(`\`\`\`${question.q}\`\`\``)
      .setFooter("لديك 15 ثانية للاجابة")
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
    const row = new MessageActionRow()
.addComponents(
new MessageButton()
    .setEmoji("<:rovex:1255515075800993853>")
    .setStyle("SECONDARY")
    .setCustomId("1")
)
        message.channel.send({embeds: [embed], components: [row] })

  let answered = false;
const collector = message.channel.createMessageCollector({
  filter: (collected) => true,
  time: 15000,
});
collector.on("collect", async (collected) => {
    const answer = collected.content.toLowerCase();
    if (Array.isArray(question.a)) {
        if (question.a.includes(answer)) {
            await collected.reply(`**${collected.author} الإجابة صحيحة!**`);
            points[message.author.id] = (points[message.author.id] || 0) + 1;
            fs.writeFileSync('./points.json', JSON.stringify(points, null, 2));
            answered = true;
            collector.stop();
        } else {
            return;
        }
    } else {
        if (answer === question.a.toLowerCase()) {
            await collected.reply(`**${collected.author} الإجابة صحيحة!**`);
            points[message.author.id] = (points[message.author.id] || 0) + 1;
            fs.writeFileSync('./points.json', JSON.stringify(points, null, 2));
            answered = true;
            collector.stop();
        } else {
            return;
        }
    }
});
                        
     collector.on("end", (collected, reason) => {
       if (reason == "time") {
         const embed = new MessageEmbed()
          .setColor("RED")
          .setDescription(`🕘 | أنتهى الوقت لم تقوم بالاجابة الصحيحة`)
            message.channel.send({embeds: [embed]})
       }
     });
   
        
  }
});

c.on("messageCreate", message => {
if(message.content === prefix + "voes"){
if(!message.member.permissions.has("ADMINISTRATIOR")) return;
    const embed = new MessageEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
    .setDescription("**تستطيع [تصويت](https://top.gg/bot/1255540038670876714?s=039540bafd310) لروفكس لكي تساعدنا على تطوير البوت بشكل مستمر، قم بالتصويت الان من خلال الضغط على الزر اسفل الرسالة.**")
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setColor("#40A768")
    
    const row = new MessageActionRow()
    .addComponents(
    new MessageButton()
        .setLabel("تصويت")
        .setStyle("LINK")
        .setURL("https://top.gg/bot/1255540038670876714?s=039540bafd310")
    );
    message.delete();
    message.channel.send({ embeds: [embed], components: [row] })
}
});

c.on("messageCreate", async message => {
if(message.content.startsWith(prefix) && (message.content.includes("كت") || message.content.includes("cut"))){
const random = [
    "‎لو قالوا لك  تناول صنف واحد فقط من الطعام لمدة شهر . ‏وش بيكون اختيارك ؟",
    "‎شخص تحب تستفزه ؟",
    "‎لو حلمت في شخص وصحيت وحصلت رساله من نفس الشخص . ارسل ايموجيي مثل ردة فعلك.",
    "‎هات صورة تحس إنك ابدعت بتصويرها.",
    "‎على إيش سهران ؟",
    "‎مين تتوقع يطالعك طول الوقت بدون ملل ؟",
    "‎وين جالس الحين ؟",
    "‎كم من عشرة تقيم يومك ؟", 
    "‎أطول مدة نمت فيها كم ساعه ؟",
    "‎أجمل سنة ميلادية مرت عليك ؟",
    "‎أخر رسالة بالواتس جاتك من مين ؟",
    "‎ليه مانمت ؟",
    "‎تعتقد فيه أحد يراقبك ؟",
    "‎كم من عشره تعطي حظك ؟",
    "‎كلمه ماسكه معك الفترة هذي ؟",
    "‎شيء مستحيل تمل منه ؟",
    "‎متى تنام بالعادة ؟",
    "‎كم من عشرة جاهز للدراسة ؟",
    "‎منشن صديقك الفزعة",
    "‎يوم نفسك يرجع بكل تفاصيله ؟",
    "‎أجمل صورة بجوالك ؟",
    "‎ايش أغرب مكان قد صحتوا فيه؟",
    "‎اذا جاك خبر مفرح اول واحد تعلمه فيه مين ؟",
    "‎شيء لو يختفي تصير الحياة جميلة ؟",
    "‎كم من عشرة تشوف نفسك محظوظ ؟",
    "‎امدح نفسك بكلمة وحدة بس",
    "‎كلمة لأقرب شخص لقلبك ؟",
    "‎قوة الصداقة بالمدة ولا بالمواقف ؟",
    "‎حط@منشن.شخص وقوله : حركتك مالها داعي.",
    "‎تتابع مسلسلات ولا م تهتم ؟",
    "‎تاريخ يعني لك الكثير ؟",
    "‎كم عدد اللي معطيهم بلوك ؟",
    "‎من الغباء انك ؟",
    "‎اكثر شيء محتاجه الحين ؟",
    "‎حط@منشن شخص تقوله : بطل تفكر فيني ابي انام",
    "‎ايش مسهرك ؟.",
    "‎حزين ولا مبسوط ؟",
    "‎تحب سوالف مين ؟",
    "‎كم من عشرة روتينك ممل ؟",
    "‎شيء مستحيل ترفضه ؟.",
    "‎كم من عشرة الإيجابية فيك ؟.",
    "‎تعتقد اشباهك الاربعين عايشين حياة حلوة ؟.",
    "‎مين جالس عندك ؟",
    "‎كم من عشرة تشوف نفسك انسان ناجح ؟",
    "‎شيء حظك فيه حلو ؟.",
    "‎كم من عشرة الصبر عندك ؟",
    "‎أخر مرة نزل عندكم مطر ؟",
    "‎اكثر مشاكلك بسبب ؟",
    "‎اكره شعور ممكن يحسه انسان ؟",
    "‎شخص تحب تنشبله ؟",
    "‎تنتظر شيء ؟",
    "‎جربت تسكن وحدك ؟",
    "‎اكثر لونين تحبهم مع بعض ؟",
    "‎متى تكره نفسك ؟",
    "‎كم من عشرة مروق ؟",
    "‎مدينة تتمنى تعيش وتستقر فيها طول عمرك ؟",
    "‎لو للحياة لون إيش بيكون لون حياتك ؟",
    "‎ممكن في يوم من الأيام تصبح شخص نباتي ؟.",
    "‎عمرك قابلت شخص يشبهك ؟",
    "‎اخر شخص تهاوشت معه ؟",
    "‎قبل ساعة ايش كنت تسوي ؟",
    "‎كلمة تقولها للي ببالك ؟",
    "‎أكثر شيء مضيع وقتك فيه ؟",
    "‎لو فتحتا خزانتك إيش اكثر لون بنشوف ؟",
    "‎قوة خارقة تتمنى تمتلكها ؟",
    "‎اكثر مصايبك مع مين ؟",
    "‎اذا زعلت إيش يرضيك ؟",
    "‎من النوع اللي تعترف بسرعه ولا تجحد ؟",
    "‎من الاشياء البسيطة اللي تسعدك ؟",
    "‎اخر مره بكيت",
    "‎ردّك على شخص قال : انا بطلع من حياتك؟.",
    "‎ايموجي يعبر عن وضعك الحين ؟",
    "‎التاريخ المنتظر بالنسبة لك ؟",
    "‎كلنا بنسمعك إيش بتقول ؟",
    "‎مدينتك اللي ولدت فيها ؟",
    "‎عندك شخص مستحيل يمر يوم وما تكلمه ؟",
    "‎كلمة تقولها لنفسك ؟",
    "‎كم من عشرة متفائل بالمستقبل ؟",
    "‎ردك المعتاد اذا أحد ناداك ؟",
    "حط @منشن لشخص وقله الله يسامحك بس",
    "‎أكثر كلمه تسمعها من أمك ؟",
    "‎إيش تفضل عمل ميداني ولاعمل مكتبي ؟",
    "‎أكثر حيوان تحبه ؟",
    "‎اكثر مشاكلك بسبب ؟",
    "‎اكثر صوت تكرهه ؟",
    "‎اشياء تتمنى انها م تنتهي ؟",
    "‎اشياء صعب تتقبلها بسرعه ؟",
    "‎كم من عشرة راضي عن وضعك الحالي ؟",
    "‎متى م تقدر تمسك ضحكتك ؟",
    "‎اخر شخص قالك كلمة حلوة ؟",
    "‎اكثر شيء تحبه بنفسك ؟",
    "‎شيء نفسك يرجع ؟",
    "‎اغلب وقتك ضايع على ؟",
    "‎كيف تعرفت على اعز صديق لك ؟",
    "‎تؤمن ان في حُب من أول نظرة ولا لا ؟.",
    "‎شايل هم شيء الفترة هذي ؟",
    "‎شخص م تحب تناقشه ؟",
    "تقييمك للديسكورد الفترة ذي ؟"
  
    ]

const randoms = random[Math.floor(Math.random() * random.length)];
    
    const embed = new MessageEmbed()
.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
    .setDescription(`**${randoms}**`)
.setThumbnail(message.guild.iconURL({ dynamic: true }))
.setFooter("Rovex Tweet", "https://media.discordapp.net/attachments/1255134923560587284/1255973869202706432/image0.jpg?ex=667f1451&is=667dc2d1&hm=e444fe9a7f2013f17fabc84f800d9e367b1a0864699414b202bb4b3af81862eb&")
            .setColor("#40A768")
    
    message.channel.send({ embeds: [embed] })
    
}
});

c.on("interactionCreate", async message => {
if(!message.isButton()) return;
    if(message.customId == "1"){
await message.reply({ content: `** المسؤول عن هذا الامر هو Rovex

- [رابط سيرفر الدعم الفني](https://discord.gg/p52ngCSn8g)
- [رابط اضافة البوت](https://discord.com/oauth2/authorize?client_id=1255540038670876714&permissions=8&integration_type=0&scope=bot)**`, ephemeral: true });
}
});



c.on("messageCreate", message => {
    if (message.content === prefix + "fkk" || message.content === prefix + "فكك") {
        const f = [
            "زومبي",
            "قسطنطينة",
            "حبيبي والله",
            "صراع",
            "مشروع",
            "مثلث",
            "رفرف",
            "الشعر",
            "خنق",
            "لقب",
            "إخفاء",
            "بائع",
            "ثؤلول",
            "فينوس",
            "سلالة",
            "برميل",
            "حب",
            "معدن",
            "تمام",
            "كبسولة",
            "الخيل"
        ];
        const fk = [
            "ز و م ب ي",
            "ق س ط ن ط ي ن ة",
            "ح ب ي ب ي و ا ل ل ه",
            "ص ر ا ع",
            "م ش ر و ع",
            "م ث ل ث",
            "ر ف ر ف",
            "ا ل ش ع ر",
            "خ ن ق",
            "ل ق ب",
            "إ خ ف ا ء",
            "ب ا ئ ع",
            "ث ؤ ل و ل",
            "ف ي ن و س",
            "س ل ا ل ة",
            "ب ر م ي ل",
            "ح ب",
            "م ع د ن",
            "ت م ا م",
            "ك ب س و ل ة",
            "ا ل خ ي ل"
        ];

        let fkk = Math.floor(Math.random() * f.length);
        const embed = new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
            .setDescription(`${f[fkk]}`)
            .setColor("#40A768")
            .setFooter("لديك 15 ثانية للاجابة")
            .setThumbnail(message.guild.iconURL({ dynamic: true }));
        message.channel.send({ embeds: [embed] });

        const filter = m => m.content.includes(fk[fkk]);
        message.channel.awaitMessages({ filter, max: 1, time: 15000, errors: ['time'] })
            .then((collected) => {
                message.channel.send(`**<@${collected.first().author.id}> الإجابة صحيحة!**`);
                points[message.author.id] = (points[message.author.id] || 0) + 1;
                fs.writeFileSync('./points.json', JSON.stringify(points, null, 2));
            })
            .catch(() => {
                const embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`🕘 | The time is Over`);
                message.channel.send({ embeds: [embed] });
            });
    }
});

c.on("messageCreate", async message => {
if(message.content.startsWith(prefix) && (message.content.includes("لغز") || message.content.includes("puzzle"))){
const p = [
  "شيء موجود في السماء إذا أضفت إليه حرفا أصبح في الأرض؟", 
  "ما هو الشيء الذي يوصلك من بيتك إلى عملك دون أن يتحرك؟", 
  "تاجر من التجار إذا اقتلعنا عينه طار. فمن هو؟", 
  "ما هو الشيء الذي ترميه كلما احتجت إليه؟", 
  "يسير بلا رجلين و لا يدخل إلا بالأذنين ما هو؟", 
  "ما هو الشي الذي يكتب و لا يقر؟", 
  "من هو الحيوان الذي يحك إذنه بأنفه؟", 
  "ما هو الشي الذي كلما كثر لدينا غلا و كلما قل رخص؟", 
  "ما هي التي تأكل و لا تشبع؟", 
  "ما هو الشي الذي كلما أخذت منه يكبر ؟", 
  "ما هو الشي الذي يوجد في وسط باريس؟", 
  "ما هو البيت الذي ليس فيه أبواب و لا نوافذ؟", 
  "أين يقع البحر الذي لا يوجد به ماء؟", 
  "ماهو الشي الذي ينبض بلا قلب؟", 
  "أخت خالك و ليست خالتك من تكون ؟"
  ]
  const pu = [
   "نجم", 
  "الطريق", 
  "عطار", 
  "شبكة الصيد", 
  "الصوت", 
  "القلم", 
  "الفيل", 
  "العقل", 
  "النار", 
  "الحفرة", 
  "راء", 
  "بيت الشعر", 
  "في الخريطة", 
  "الساعة", 
  "امي"
  ]

    let puz = Math.floor(Math.random() * p.length)
    const embed = new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
            .setDescription(`${p[puz]}`)
            .setColor("#40A768")
            .setFooter("لديك 15 ثانية للاجابة")
            .setThumbnail(message.guild.iconURL({ dynamic: true }));
        message.channel.send({ embeds: [embed] });
    
    const filter = m => m.content.includes(pu[puz]);
        message.channel.awaitMessages({ filter, max: 1, time: 15000, errors: ['time'] })
            .then((collected) => {
                message.channel.send(`**<@${collected.first().author.id}> الإجابة صحيحة!**`);
                points[message.author.id] = (points[message.author.id] || 0) + 1;
                fs.writeFileSync('./points.json', JSON.stringify(points, null, 2));
            })
            .catch(() => {
                const embed = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`🕘 | The time is Over`);
                message.channel.send({ embeds: [embed] });
            });
}
});

c.on("messageCreate", async message => {
if(message.content === prefix + "send-panel"){
if(!message.member.permissions.has("ADMINSTRATOR")) return;
    const embed = new MessageEmbed()
    .setTitle("Verify")
    .setDescription("test")
            .setColor("#40A768")
    .setTimestamp();
    
    const row = new MessageActionRow()
    .addComponents(
    new MessageButton()
        .setLabel("Verify")
        .setStyle("SUCCESS")
        .setCustomId("2")
    );
    
    message.delete();
    message.channel.send({ embeds: [embed], components: [row] })
}
});

c.on("interactionCreate", async interaction => {
if(!interaction.isButton()) return;
    if(interaction.customId == "2"){
const roleId = "1255134846968266763";
        await interaction.reply({ content: "**تم إعطائك الرتبة بنجاح.**", ephemeral: true });
        const role = interaction.guild.roles.cache.get(roleId);
        await interaction.member.roles.add(role);
}
});



c.login(token);
