---
sidebar_position: 2
---

# 日本語Vision

## 日本語 メタバースからマルチバースの時代へ
日本語 2021年は「NFT」という言葉の認知度が大幅に向上しましたが、もうひとつ、11月にTech Giantの社名変更を機に「メタバース」という言葉の認知度も大きく向上しました。
このメタバースという言葉は人によって様々に定義されるものですが、「デジタル上の世界」を表す言葉というのは共通見解でしょう。その世界が3DなのかVRなのか、はたまたSNS上のコミュニティ上のものかはさておき。
そうなると、各社や各コンテンツごとに違う世界観があるので、その世界観ごとにたくさんのメタバースが展開されることになります。
ユーザーの立場からすると、日常的にSNSを利用するように、複数のメタバースを日常利用する未来が想像されるのではないでしょうか。私達はその状態のことを「マルチバース」の時代と呼んでいます。

マルチバースの時代では、匿名の名前や身につけているアバター、連れているナビキャラや乗っているマシンは、自分のアイデンティティを表現するものになるのでメタバースを跨いで活用したくなります。アニメや映画の世界で語られることが現実になるのです。
## 世界がマルチバースに辿り着くまでのプロセス
世界がマルチバースに到達するためには、一足飛びに到達することはできません。

マルチバース上での相互利用性には様々クリアしなければいけない課題がありますが、まずは各社のメタバースにとって中立的にデジタルアセットの所有情報を担保する仕組みが必要です。それにはブロックチェーンやNFTという技術を用いるのが、現時点の最適解でしょう。
## マルチバースに向けたOasysの働き
マルチバースの時代ではブロックチェーンやNFTという技術が利用されると考えているものの、既存のLayer 1の技術ではトランザクションスピードの遅さやgas代（実行手数料）がかかることなど、マス層には難解なUXを強いることになってしまいます。2018年ではこれをクリアできなかったでしょう。しかし、2021年にはLayer 2の技術が実用され始め、通常のサーバ利用と同じスピードでトランザクションが完了可能となりました。ようやく宿題を終える時がきました。
実用されているLayer 2の多くは、高価値であるがゆえにgas代が高価なEthereumをLayer 1として利用しているため、トランザクションスピードは瞬時ではあるもののそれなりのgas代がかかります。そのため、EVMサイドチェーンでゲームに特化したパブリックブロックチェーンのOasys Layer 1（Consensus Layer）を稼働させ、ユーザが直接Layer 1を使うことはほぼない形とし、実際のロジックはLayer 2（Execution Layer）で稼働させるアーキテクチャとしました。事業者がメタバースごとに独自のLayer 2を稼働させることができるので、ユーザはgas代が無料となり、そのgas代は事業者が肩代わりすることも可能となります。もちろん、不必要に電力消費を行うこともないので、環境に配慮したPoSチェーンとなっています。

![Oasys Architecture](/img/vision/vision-oasys-layer-architecture.png)

OasysではこのOasys Archtectureを用いることで、マス層のエンドユーザーには、Web2時代と遜色ないUXでの、ブロックチェーン利用環境を提供し、ゲームデベロッパーには「カーボンニュートラル」「高ユーザビリティ」「高い自由度」をもつLayer 2という各社のメタバースを構築環境を提供します。
## Oasysはマルチバース時代のHubとなります
マルチバースの時代、Layer 2という技術要素、NFTの流行、様々な要素がOasysという「Blockchain for The Games」のプロジェクトにタイミングよく揃ってきたなと感じています。しかし、そういう要素だけでは成立しません。Oasysに賛同していただくゲーム事業者やユーザの皆様がいればこそですし、むしろそれが一番重要な要素です。
Oasysはメタバース時代のHubとなります。

---

Add **Markdown or React** files to `src/pages` to create a **standalone page**:

- `src/pages/index.js` -> `localhost:3000/`
- `src/pages/foo.md` -> `localhost:3000/foo`
- `src/pages/foo/bar.js` -> `localhost:3000/foo/bar`

## Create your first React Page

Create a file at `src/pages/my-react-page.js`:

```jsx title="src/pages/my-react-page.js"
import React from 'react';
import Layout from '@theme/Layout';

export default function MyReactPage() {
  return (
    <Layout>
      <h1>My React page</h1>
      <p>This is a React page</p>
    </Layout>
  );
}
```

A new page is now available at `http://localhost:3000/my-react-page`.

## Create your first Markdown Page

Create a file at `src/pages/my-markdown-page.md`:

```mdx title="src/pages/my-markdown-page.md"
# My Markdown page

This is a Markdown page
```

A new page is now available at `http://localhost:3000/my-markdown-page`.
