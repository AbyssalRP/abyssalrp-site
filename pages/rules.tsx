import React, { useState, useEffect, useRef } from "react";

const categories = {
  "General Server Rules": [
    "Support System:",
    "• Abyssal RP uses a dedicated support ticket system within Discord for all staff-related communications. Reports and assistance are handled through the #support-center channel.",
    "• Each ticket requires a completed form for efficiency and accuracy. Incomplete forms may result in the ticket being closed without review.",
    "• All ticket interactions are logged, and transcripts are sent via DM. To receive these transcripts, ensure your Privacy Settings allow Direct Messages.",
    "Reporting Protocol:",
    "• All reports must include at least 2 minutes of video before and during the violation, with clear audio of both game and microphone. Player IDs must be captured.",
    "• Reports must be submitted within 24 hours of the incident. Streaming clips are acceptable if you were involved in the scene and provide a timestamp and VOD link.",
    "Discord Rules:",
    "• Respect everyone, and avoid harassment or hate speech. Use English in public channels. Do not share in-character information in out-of-character (OOC) channels. Do not ping or DM staff unless prompted. Nicknames must be in English. Keep the chat friendly and drama-free.",
    "Voice Chat Rules:",
    "• A working microphone is required. Push-To-Talk must be enabled. English must be spoken at all time. Voice changers are allowed only if clear and realistic.",
    "Hate Speech, Slurs, and Discrimination:",
    "• Racism, hate speech, and any form of discrimination are strictly prohibited."
  ],
  "Roleplay Expectations": [
    "RDM:",
    "• RDM is killing another player without incentive or any roleplay interaction. Always iniate roleplay before shooting. On-site kills are not allowed. Each RDM counts as 2 warnings.",
    "VDM:",
    "• VDM is killing another player with a vehicle without any reason or roleplay interaction. Each VDM counts as 2 warnings.",
    "Breaking Character:",
    "• Always stay in character. Do not reference server mechanics, rules, or OOC terms. Do not mention rule violations during scenes. Post-scene conversations after respawning are prohibited.",
    "Combat Logging:",
    "• Logging out to avoid consequences is prohibited. Disconnects during roleplay must be reported via a Discord ticket. Combat logging counts as 2 warnings.",
    "Fail RP:",
    "• Roleplay must be realistic. Do not sprint, jump, or fight immediately after being revived by EMS. Act out your injuries.",
    "Metagaming:",
    "• Do not use out-of-character (OOC) information for in-city character gain. Watching streams while in city is a violation. Stream sniping will result in a permanent ban.",
    "Gun Fear & Valuing Life:",
    "• If a gun is pointed at you, you must comply. The person aiming the gun first controls the roleplay. You must show fear, even if it results in death. Hostage-taking must be relastic, no using friends, volunteers, or you own gangs members."
  ],
  "EMS Revives and New Life Rule": [
    "EMS Revives:",
    "• EMS must be given proper /me and verbal interaction. EMS can not remind you who killed you. After revival, leave the scene immediately. Do not loot or re-engage in the situation for 15 minutes. Do not pull dead bodies from the scene or rob involved vehicles.",
    "New Life Rule (NLR):",
    "• If you respawn or are declared dead: Forget the events that led to your death. Do not return to the area for 15 minutes. Do not interact with involved players unless reminded through roleplay. You cannot leave yourself notes, send yourself texts, or store messages to recall the scene. You may only remember the roleplay if another player provides specific details through in-character conversation."
  ],
  "Gangs & Organizations": [
    "Gang Creation Requirements:",
    "• A minimum of 4 active members is required to apply for gang status. All 4 must be in the city and active for at least 7 days prior to application. Once accepted, gangs enter a 1-week probationary period where staff will observe roleplay quality and group conduct.",
    "Gang Structure:",
    "• Max: 12 full members + 3 hangarounds. Leaders are fully responsible for their members' actions. Poor roleplay or repeated violations can result in warnings or disbandment. Gang members must wear a visible item that clearly identifies them as part of their gang at all times.",
    "Gang Wars:",
    "• All wars must have significant roleplay buildup—no spur-of-the-moment shootouts. A ticket must be submitted to staff with: RP reason for the war. Proposed terms and limits (zones, weapons, etc.). Once a war ends, both gangs enter a 2-week cooldown before initiating or joining another.",
    "Bleeding Out & Switching Gangs:",
    "• If your character is “bled out” (removed from the gang IC), you must: Forget all gang knowledge (locations, stash spots, alliances, etc.). Wait 14 days before becoming a hangaround for another gang. Wait an additional 14 days before becoming a full member. It is the gang's responsibility to roleplay the bleed-out within 7 days of the member leaving. If the gang does not roleplay the bleed-out within the 7-day window, the character will be considered bled out but will be able to retain all memory of being a part of the gang. If you leave a gang and do not log in for 7 consecutive days, you will be considered automatically bled out as if the gang completed the bleed-out roleplay, and you must forget all gang-related knowledge.",
    "Interaction with PD:",
    "• Gangs must engage in quality roleplay with law enforcement—this means: No instant shootouts or getaways during every traffic stop or police interaction. Use interactions to build tension, character, and long-term arcs—not just action scenes."
  ],
  "Whitelisted Jobs": [
    "EMS:",
    "• You may not impersonate EMS. EMS gear marked EMS cannot be stolen. EMS may not be taken hostage while on duty.",
    "LEO:",
    "• You may not impersonate law enforcement. You must value your life during interactions with law enforcement. Law enforcement may be help hostage with valid roleplay. Dirty cop behavior (selling PD items, etc) in bannable. PD gear marked PD cannot be stolen."
  ],
  "Gameplay Mechanics": [
    "Exploiting, Cheating, or Using Macros:",
    "• Cheats, macros, dupes, and third-party aim tools = instant ban. External crosshairs are allowed. Flawless Widescreen or similar software is banned.",
    "Powergaming:",
    "• Exploiting systems or forcing roleplay outcomes is powergaming. Using tools from other servers (e.g., removed emotes) is not allowed. Creating no choice situations for others is not valid roleplay.",
    "Character Limits & Alternate Characters:",
    "• You may have up to 3 active characters, but each must serve a distinct role. Example: One police officer, one non-gang criminal, and one civilian. You may not play multiple characters that fall under the same category (e.g., two criminals, two gang members, or two law enforcement characters). If you play a police officer, you may not have any other character involved in a gang, directly or indirectly. This prevents conflicts of interest and ensures proper story separation. Using alternate characters to bypass consequences, transfer knowledge/items, or influence another character’s roleplay is strictly prohibited.",
    "Character Development:",
    "• Create and grow your character over time. Personality, goals, and backstory matter. Depth and continuity are highly encouraged for immersive roleplay."
  ],
  "Heist Rules": [
    "General Heist Rules:",
    "• All heists must be initiated with valid roleplay. You must follow the Rule of 6—no more than 6 participants actively involved. No third parties may interfere in active heists unless it’s part of a planned counter-RP and the limit is not exceeded.",
    "Hostage Rules:",
    "• Hostages must be actual players, not volunteers or NPCs. Must have a weapon aimed at them during the initiation. May not use friends as fake hostages to exploit rules. Hostages must be released or roleplayed properly—no executions without reason. On-Duty EMS cannot be taken hostage Pd can be taken hostage vith valid roleplay.",
    "Negotiations:",
    "• PD must be given a chance to negotiate unless the scene is fast-paced by design. 2 demands per heist/robbery and demands must be realistic (e.g., safe passage, no spikes, etc.). PD does not have to accept your demands. You may not stall excessively to wait for backup or gear. Once negotiations end, escalation begins.",
    "Escape and Chases:",
    "• You cannot store vehicles while being actively chased by PD or other players. Vehicle switches are allowed only if roleplayed properly (e.g., a pre-planned drop-off or switch point). You may not start a heist getaway on a motorcycle. You must begin in a car or truck. You may switch to a motorcycle during the escape if it’s done with valid roleplay. Avoid unrealistic driving, including water dives, jumps, launching off cliffs, or exploiting map mechanics to escape.",
    "PD Limitations:",
    "• PD presence is based on the number of LEOs on-duty. If less than 3 LEOs, major heists (bank, jewelry, etc.) may not proceed. Always confirm officer count before starting the heist.",
    "Cooldowns:",
    "• You may not hit the same location more than once in a 2-hour window. You may not use alts to bypass cooldowns. All heist loot distribution must be IC and realistic.",
    "Interference:",
    "• You cannot interrupt or ambush another crew’s heist. Doing so may result in a warning for powergaming or fail RP. If you see an active heist, let it play out or report via proper RP."
  ],
  "Final Rules": [
    "Staff Interaction:",
    "• Be respectful and calm with staff. Use the proper support ticket system for all concerns. You may appeal warnings via a General Support Ticket. Staff has the final say. Harassment of staff: abusing, threatening, or manipulating staff in any form (IC or OOC) is a bannable offense. Staff are players too—treat them with respect.",
    "AFK & Queue Holding:",
    "• You may not AFK in the city for longer than 10 minutes—you will be kicked. Do not hold queue spots for friends, alt accounts, or to avoid waiting later. Repeated AFK or queue abuse will result in a warning or temporary suspension.",
    "Grief RP / Trolling / Low Effort Crime:",
    "• RP must have purpose—random crime with no storyline is not allowed. Examples of grief RP: Constant drive-bys with no lead-up. Starting shootouts with no escalation. Baiting police into pointless scenes. Repeated low-effort RP will lead to warnings or bans."
  ],
  "Key RP Terms": [
    "Fail RP: Unrealistic or immersion-breaking behavior that wouldn’t happen in real life.",
    "Bleed Out: IC removal from a gang that requires the character to forget gang knowledge.",
    "Powergaming: Forcing outcomes or using unrealistic actions to gain an advantage.",
    "On-sight: Killing a player immediately without RP interaction.",
    "Combat Logging: Logging out mid-scene to avoid consequences.",
    "Stream Sniping: Using stream info to gain an in-game advantage."
  ]
};

export default function RulesPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const colors = ["#ffffff", "#a0c4ff", "#bdb2ff", "#ffc6ff", "#caffbf"];
    const maxDimension = Math.max(window.innerWidth, window.innerHeight);
    const stars = Array.from({ length: 300 }, () => ({
      x: (Math.random() - 0.5) * maxDimension * 6,
      y: (Math.random() - 0.5) * maxDimension * 6,
      z: Math.random() * maxDimension,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      vz: -1.5 + Math.random() * -0.5,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    const render = () => {
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        star.x += star.vx;
        star.y += star.vy;
        star.z += star.vz;

        if (star.z <= 0) {
          star.z = maxDimension;
          star.x = (Math.random() - 0.5) * maxDimension * 6;
          star.y = (Math.random() - 0.5) * maxDimension * 6;
        }

        const k = 128.0 / star.z;
        const x = star.x * k + canvas.width / 2;
        const y = star.y * k + canvas.height / 2;

        if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
          const size = (1 - star.z / maxDimension) * 2;
          ctx.fillStyle = star.color;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const toggleCategory = (category: string) => {
    setActiveCategory((prev) => (prev === category ? null : category));
  };

  return (
    <div className="min-h-screen bg-black text-white flex relative">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0" />
      <div className="fixed inset-0 z-10 bg-gradient-to-b from-transparent via-black/20 to-black/40 pointer-events-none" />

      <aside className="z-10 w-64 border-r border-white/10 bg-black/70 p-6 space-y-4">
        {Object.keys(categories).map((title) => (
          <button
            key={title}
            onClick={() => toggleCategory(title)}
            className="block w-full text-left px-4 py-2 rounded-lg font-semibold bg-white/10 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500 text-white/70 transition-all duration-300"
          >
            {title}
          </button>
        ))}

        <div className="pt-10">
          <a href="/" className="block w-full text-left px-4 py-2 rounded-lg font-semibold bg-white/10 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500 text-white/70 transition-all duration-300">
            ← Back to Home
          </a>
          <a href="/join" className="block w-full text-left px-4 py-2 rounded-lg font-semibold bg-white/10 hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500 text-white/70 transition-all duration-300 mt-2">
            Join Abyssal RP
          </a>
        </div>
      </aside>

      <main className="z-10 flex-1 p-10">
        {activeCategory ? (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
              {activeCategory}
            </h2>
            <ul className="space-y-2">
              {categories[activeCategory].map((rule, index) => (
                rule.endsWith(":") ? (
                  <li key={index} className="text-base md:text-lg font-bold mt-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent list-none">
                    {rule}
                  </li>
                ) : (
                  <li key={index} className="list-disc list-inside bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent text-sm ml-4">
                    {rule}
                  </li>
                )
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center text-white/60 text-sm">Select a rule category from the left</div>
        )}
      </main>
    </div>
  );
}
