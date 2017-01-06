+++
title = "UPMC"
draft = false
date = "2016-12-18T15:14:53-08:00"

+++

<header class="app-header">
    <a href="/#splitbill" class="text-logo">
        CHINWEI
    </a>
</header>

<span class="label">Side Project</span>
<span class="title">Split Bill</span>
<span class="byline">Split bills without signing in</span>


<!-- Simple video example -->
<video autoplay>  
   <source type='video/mp4' src='/assets/splitbill/splitbill2x.mp4' media='(min-device-pixel-ratio:2), (-webkit-min-device-pixel-ratio:2), (min--moz-device-pixel-ratio:2), (-o-min-device-pixel-ratio:2)'> 
   <source type='video/mp4' src='/assets/splitbill/splitbill.mp4' media='(max-device-pixel-ratio:1), (-webkit-max-device-pixel-ratio:1), (max--moz-device-pixel-ratio:1), (-o-max-device-pixel-ratio:1)'> 
</video>


Splitbill attempts to address a common problem in a crowded space: splitting meal payments after a dinner.

I’ve looked at apps like Splitwise, which solves a similar problem but one thing I didn’t like was that everyone at the table also needed an account for it to work.

I’ve known about another app, SplitWise for a long time. One thing I disagreed with was that I had to have an account, along with everyone else at the table. Even though the UI was clean and presentable, the process of divvy up the payments was confusing.


My approach makes a few assumptions:

- The identity of the food is not that important
- The app does not need to know the identity of the people in the transaction


- I’ve restricted to 6 diners due to screen size, that’s the trade off. In the future, if there is a popular use case, it should be possible to scale to support slightly more users.

If the above are true, then it should be possible to streamline the flow to be much more efficient


### Timeline

<div class="timeline">
    <div class="row">
        <div class="timeline-label">Sketch</div>
        <div class="timeline-bar-container">
            <div class="timeline-bar color-1" style="width: 40%"></div>
        </div>
    </div>
    <div class="row">
        <div class="timeline-label">React Native</div>
        <div class="timeline-bar-container">
            <div class="timeline-bar color-2" style="width: 40%;     margin-left: 30%;"></div>
        </div>
    </div>
    <div class="row">
        <div class="timeline-label">Swift</div>
        <div class="timeline-bar-container">
            <div class="timeline-bar color-3 u-pull-right" style="width: 40%"></div>
        </div>
    </div>
</div>
