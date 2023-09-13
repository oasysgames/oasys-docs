---
---

# Paima Engine

[Paima Engine](https://paimastudios.com) is a framework to build blockchain games that not only supports web2.5 games, but also onchain games and autonomous worlds.

Thanks to its EVM compatibility, Oasys natively supports games written using Paima Engine. Paima is an easy solution for companies who want to experiment building onchain games, as Paima

1. **Is easy to use**. Paima allows writing onchain games using Javascript, meaning you do not need deep Solidity knowledge to write your game
2. **Minimizes risk**: Games written with Paima do not require any trusted party to operate. Users assets can stay directly on Oasys (no bridge,  custody system or other centralized services required for in-game assets). This increases composability with other Oasys games and minimizes the impact of any developer mistake when developing your game, as well as the impact of the game or server you operate getting hacked.
3. **Optimized for L2s like Oasys verses**: Paima comes with multiple features optimized for deploying games to L2s, such as the ability to [emulate stable tick rate](https://docs.paimastudios.com/home/react-to-events/funnel-types/stable-tick-rate-funnel) for your game. This is useful because verses (and L2s in general) do not have constant block times (instead, blocks are only made as transactions are submitted). This is useful if you want to create a game that leverages timers or event-driven behavior without having to rely on time oracles.

Paima comes with many [templates](https://github.com/PaimaStudios/paima-game-templates) to get started, and you can learn more about the core technology behind Paima from [their documentation](https://docs.paimastudios.com). You can also download Paima Engine from [their Github](https://github.com/PaimaStudios/paima-engine/releases).

The Paima team also has experience working with Oasys, and so they can support any Oasys-specific requirements.
