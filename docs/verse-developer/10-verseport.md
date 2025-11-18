# VersePort

VersePort is Oasys' community portal for discovering, launching, and tracking on-chain campaigns. It enables:

- Projects to create campaigns that boost on-chain activity and spotlight new launches.
- Community organizers to list events and collect verifiable participation data.
- Users to earn on-chain score points and occasional pOAS airdrops tied to their activity.

## Discord campaign bot

VersePort ships an official Discord bot so users can post their campaign drafts directly from Discord.

### Capabilities

- `/submit` command walks users through title, description, timeframe, reward type, and reference links.
- Automatic field validation plus previews to cut down on moderation back-and-forth.
- Approval or rejection notifications posted into the channel so moderators know final decisions.

### Installation

1. Server admins open the deployment link: <a href="https://discord.com/oauth2/authorize?client_id=1428271120754278522&permissions=2048&integration_type=0&scope=applications.commands+bot" target="_blank" rel="noopener noreferrer">Add VersePort bot to Discord</a>.
2. Select the Discord server and grant the requested permissions (Send Messages, Use Slash Commands, Embed Links).
3. Restrict the bot to specific channels or roles if needed; full administrator access is not required.

### Usage

1. In an authorized channel, run `/submit`.
2. Follow the prompts to enter campaign metadata, eligibility criteria, assets, and reward information.
3. Submit the form; the bot posts a summary embed plus a management link for the VersePort dashboard.
4. Moderators approve the submission inside VersePort, and approved campaigns immediately appear on the public portal.

Submitted entries go through a lightweight review by the VersePort operations team, who verify links, eligibility criteria, and reward details before publishing the campaign.