# Overwat

![lineup-standard](https://user-images.githubusercontent.com/2539016/38170371-e8536d86-3538-11e8-85e2-0cb125bf6869.jpg)

## An Overwatch Player Stats Scraper

_Overwat_ is a utility for obtaining player stats for PlayOverwatch player profiles.

Instead of having to write tedious code to look up individual stats values from the PlayOverwatch HTML, _Overwat_ cuts out the middleman and passes the savings onto _you_!

### Example Usage

```js
const scrape = require('./scraper');
const player = scrape('Corgmello#1387', 'en-us', 'pc');

// 39
player.then(player => console.log(player.games_won));
```

### Example Output

```js
{
  "hero": "Corgmello",
  "image": "https://d1u1mce87gyfbn.cloudfront.net/game/unlocks/0x0250000000001642.png",
  "games_won": 39,
  "quickplay": {
    "top_heroes": {
      "Time Played": [
        {
          "hero": "Widowmaker",
          "value": "6 hours"
        },
        {
          "hero": "Moira",
          "value": "1 hour"
        },
        {
          "hero": "Roadhog",
          "value": "23 minutes"
        },
        {
          "hero": "Zenyatta",
          "value": "18 minutes"
        },
        {
          "hero": "Mercy",
          "value": "16 minutes"
        },
        {
          "hero": "Reaper",
          "value": "10 minutes"
        },
        // more top heroes...
      ],
      "Games Won": [
        // ...
      ],
      "Weapon Accuracy": [
        // ...
      ],
      "Eliminations per Life": [
        // ...
      ],
      "Multikill - Best": [
        // ...
      ],
      "Objective Kills - Average": [
        // ...
      ]
    },
    "career_stats": {
      "ALL HEROES": {
        "Barrier Damage Done": "55,521",
        "Melee Final Blow": "1",
        "Deaths": "353",
        "Hero Damage Done": "299,911",
        "Time Spent on Fire": "56:33",
        "Solo Kills": "207",
        "Objective Time": "35:17",
        "Objective Kills": "357",
        "Final Blows": "566",
        "Eliminations": "990",
        "All Damage Done": "359,340",
        "Environmental Kills": "2",
        "Multikills": "2",
        "Healing Done": "129,380",
        "Recon Assists": "15",
        "Offensive Assists": "37",
        "Defensive Assists": "248",
        "Eliminations - Most in Game": "32",
        "Final Blows - Most in Game": "24",
        "All Damage Done - Most in Game": "14,653",
        "Healing Done - Most in Game": "14,106",
        "Defensive Assists - Most in Game": "23",
        "Offensive Assists - Most in Game": "8",
        "Objective Kills - Most in Game": "24",
        "Objective Time - Most in Game": "02:47",
        "Multikill - Best": "3",
        "Solo Kills - Most in Game": "24",
        "Time Spent on Fire - Most in Game": "05:26",
        "Melee Final Blow - Most in Game": "1",
        "Turrets Destroyed - Most in Game": "10",
        "Environmental Kills - Most in Game": "2",
        "Kill Streak - Best": "32",
        "Hero Damage Done - Most in Game": "11,942",
        "Barrier Damage Done - Most in Game": "6,474",
        "Recon Assists - Most in Game": "15",
        "Barrier Damage Done - Avg per 10 Min": "2",
        "Deaths - Avg per 10 Min": "0",
        "Hero Damage Done - Avg per 10 Min": "9",
        "Time Spent on Fire - Avg per 10 Min": "0",
        "Solo Kills - Avg per 10 Min": "0",
        "Objective Time - Avg per 10 Min": "0",
        "Objective Kills - Avg per 10 Min": "0",
        "Healing Done - Avg per 10 Min": "4",
        "Final Blows - Avg per 10 Min": "0",
        "Eliminations - Avg per 10 Min": "0",
        "All Damage Done - Avg per 10 Min": "10",
        "Cards": "31",
        "Medals": "187",
        "Medals - Gold": "80",
        "Medals - Silver": "55",
        "Medals - Bronze": "52",
        "Time Played": "9 hours",
        "Games Won": "39",
        "Turrets Destroyed": "25"
      },
      "Reaper": {
        "Self Healing": "374",
        "Self Healing - Most in Game": "114",
        "Self Healing - Avg per 10 Min": "1",
        "Eliminations": "14",
        "Deaths": "11",
        "Final Blows": "3",
        "All Damage Done": "4,535",
        "Objective Kills": "9",
        "Objective Time": "01:07",
        "Critical Hits": "62",
        "Hero Damage Done": "3,538",
        "Barrier Damage Done": "977",
        "Critical Hit Accuracy": "11%",
        "Weapon Accuracy": "18%",
        "Eliminations - Most in Life": "3",
        "All Damage Done - Most in Life": "894",
        "Weapon Accuracy - Best in Game": "26%",
        "Kill Streak - Best": "3",
        "All Damage Done - Most in Game": "1,550",
        "Eliminations - Most in Game": "6",
        "Final Blow - Most in Game": "1",
        "Objective Kills - Most in Game": "5",
        "Objective Time - Most in Game": "00:26",
        "Critical Hits - Most in Game": "23",
        "Critical Hits - Most in Life": "15",
        "Hero Damage Done - Most in Game": "1,290",
        "Hero Damage Done - Most in Life": "705",
        "Barrier Damage Done - Most in Game": "671",
        "Barrier Damage Done - Avg per 10 Min": "2",
        "Critical Hits - Avg per 10 Min": "0",
        "Objective Time - Avg per 10 Min": "0",
        "Objective Kills - Avg per 10 Min": "0",
        "Final Blows - Avg per 10 Min": "0",
        "Eliminations - Avg per 10 Min": "0",
        "Deaths - Avg per 10 Min": "0",
        "Hero Damage Done - Avg per 10 Min": "6",
        "Eliminations per Life": "1.27",
        "All Damage Done - Avg per 10 Min": "7.22",
        "Medals - Bronze": "2",
        "Medals - Silver": "0",
        "Medals - Gold": "1",
        "Medals": "3",
        "Time Played": "10 minutes",
        "Games Won": "0"
      },
      // more career stats...
    }
  },
  "competitive": {
    "top_heroes": {},
    "career_stats": {}
  }
}
```

### Upcoming Work

Adding Achievements to parsed output

Adding a GraphQL frontend
