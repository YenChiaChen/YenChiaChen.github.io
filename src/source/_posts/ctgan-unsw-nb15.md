---
title: "平衡藝術：如何用SMOTE和GAN技術解決數據不平衡"  
date: 2023/06/01
updated:  
categories:
- Machine Learning
- Data Science  
tags:
- UNSW-NB15 
- CTGAN
- Dataset Imbalance
- Generative Models
- Data Accuracy
keywords: ["UNSW-NB15", "CTGAN", "Dataset Imbalance", "Generative Models", "Data Accuracy Improvement"] 
description: "Explore how CTGAN can be used to effectively address and correct data imbalances in the UNSW-NB15 datasets, significantly improving dataset accuracy." 
cover: /img/ctgan-bg.webp
published: false
---

## 引言：當機器學習遇到不平衡的挑戰
想像一下，您正在訓練一個機器學習模型來識別網絡攻擊，但突然發現模型在某些罕見的攻擊類型上表現不佳。這正是數據不平衡帶來的現實挑戰。在這個數據驅動的時代，資料集的品質不僅是機器學習模型成功的基石，更是決定成敗的關鍵。本文將探討一個重要問題：生成式模型是否能有效解決這一資料集的不平衡問題？

透過UNSW-NB15資料集。我們將探索多種方法，包括SMOTE、傳統的GAN、CGAN以及CTGAN，來解決數據不平衡的挑戰。


## 有關UNSW-NB15
![UNSW-NB15資料分布](/img/ctgan-dataset.png)
在UNSW-NB15資料集中，某些攻擊類型的樣本數量遠遠少於其他類型或正常流量，這導致了一個嚴重的問題：我們的機器學習模型可能會對這些較少見的攻擊類型產生偏見。這不僅降低了對這些罕見攻擊的檢測能力，還可能導致模型錯誤地將正常流量標記為異常。

右側的圖片展示了使用MLP直接學習的結果，模型的效能與資料數量呈正相關，而這些類別也是拖累整體效能的關鍵。這就是我們面臨的挑戰：如何有效填補這些數據差距？

## 我們有什麼工具？
### SMOTE：數據的調色盤
{% tabs 簡單來說 %}
<!-- tab -->
想象一下，你在畫一幅畫，但突然發現藍色顏料不夠了。SMOTE（合成少數過採樣技術）就像一位魔術師，能夠"魔術般"地創造出更多的藍色顏料，使畫作色彩平衡。在數據科學中，SMOTE通過創建新的少數類實例，來平衡數據集中的類別分佈。就像在畫布上平衡顏色一樣，SMOTE在數據集中平衡信息。
<!-- endtab -->
<!-- tab -->
![UNSW-NB15資料分布](/img/ctgan-smote-math.png)
SMOTE (Synthetic Minority Over-sampling Technique) 的基本思想是對少數類樣本進行分析和抽樣，從而生成新的合成樣本。
這個公式的基本思想是在原始樣本 x 和它的一個最近鄰 xnn 之間進行線性插值，從而生成一個新的樣本 xnew 。這種方法可以幫助擴充少數類別的樣本數，從而減少學習模型的類別不平衡問題。
<!-- endtab -->
{% endtabs %}

### GAN：對抗生成的藝術家和評論家
GAN（生成對抗網絡）可以被想象成一位藝術家和一位評論家。藝術家（生成器）嘗試創造逼真的作品（數據），而評論家（辨別器）試圖分辨這些作品是真實的還是偽造的。他們之間的這種對抗過程持續改善藝術家的創作技巧，直到連評論家都無法區分真偽。

### CGAN：定制的創作
CGAN（條件生成對抗網絡）是GAN的一個變體，就像一位接受特定要求的藝術家。在CGAN中，藝術家（生成器）不僅要創作逼真的作品，還要根據特定的條件（如標籤或類型）來創作。這就好比一位畫家不僅要畫出逼真的蘋果，還要根據要求畫出特定品種的蘋果。

### CTGAN：專注於表格的創造者
CTGAN（表格生成對抗網絡）專門用於處理表格數據。想象一下，一位專門繪畫靜物的藝術家，他專注於繪製桌子上的物品（表格數據）。CTGAN通過學習表格數據的特徵，創造出新的、逼真的表格數據行，就像藝術家精心繪製每一個細節，確保整體作品的真實性和和諧性。


## 實驗結果
### SMOTE
![UNSW-NB15資料分布](/img/ctgan-smote.png)
SMOTE對模型性能的提升似乎不那麼明顯，就像在一幅巨大壁畫上修補了幾處細小的裂縫。
在數據上可以看的出來，SMOTE是有用的，但對於像是Analysis來說，可能並不適合用線性插植來訓練。