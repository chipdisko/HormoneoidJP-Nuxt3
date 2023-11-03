<script setup lang="ts">
// reference https://dev.to/afif/we-can-finally-animate-css-gradient-kdk
import Chrissy from './chrissy.webp';
import Flyer from './flyer-sq.webp';

const data = {
  venue: "CIRCUS OSAKA",
  date: "2023-11-11 SAT",
  time: "22:30",
  charges: [{
    type: "DOOR",
    money: 2000,
    unit: "円"
  }],
  guests: [
    {
      "name": "Chrissy",
      "act": "DJ",
      "from": "San Francisco",
      "url": "https://soundcloud.com/chrissytrax",
    }
  ],
  locals: [
    {
      name: "Naco",
      act: "LIVE",
      runs: ["85acid"]
    },
    {
      name: "Lomax",
      act: "DJ",
      runs: ["NC4K"]
    },
    {
      name: "Kaoll",
      act: "DJ",
    },
    {
      name: "Ascalypso",
      act: "DJ",
    },
    {
      name: "KA4U",
      act: "DJ",
    },
    {
      name: "catchpulse",
      act: "VFX",
    }
  ],
  description: `ロンドンに拠点を構えるコミュニティラジオ『Aaja Music』でのマンスリープログラム『Hormoneoid JP』が1周年を迎え、地球上で最もダンスミュージックの知識が豊富なDJ/プロデューサーの1人 と称されるChrissyをサンフランシスコから招いたスペシャルアニバーサリーパーティーを行う。
  ローカルにはScuffed Recordings(UK)等からリリースし自身のレーベル85acidを運営するNacoのビートサイエンスなLIVEに、京都を拠点にするハウスレーベルNC4KをSTONES TAROと共に主催するLomaxがUKツアー帰国直後の出演。当プログラムでギャルベース回が好評で独自視点でシカゴハウスをプレイするKaoll。そしてAajaレジデンシーのAscalypso & KA4Uが脇を固め、ジャンル横断型のChrissyに相応しいフレンドリーシップを持ったラインナップが揃うRaveパーティーに。`
}
</script>
<template>
  <section class="lg:sticky top-0 left-0 min-h-screen lg:min-h-0 lg:h-screen bg-base-200 grid grid-cols-2">
    <div class="h-full -mr-12">
      <img :src="Chrissy" alt="Chrissy" class="w-full h-full object-cover object-top" />
    </div>
    <div class="relative h-full py-12 pt-20 lg:py-24 text-white bg-black flex flex-col gap-8 md:gap-12 justify-center px-4 md:px-12 before:content-[''] before:absolute before:top-0 before:-left-12 before:w-12 before:h-full before:bg-gradient-to-l before:from-black before:to-transparent ">
      <h2 class="font-primary text-5xl md:text-7xl lg:text-5xl xl:text-6xl 2xl:text-8xl flex flex-col gap-0">
        <small class="block font-tertiary text-[.5em] tracking-tight leading-[.6] mb-[.6em]">
          <Logo /> <span class="italic text-[.6em]">presents</span>
        </small>
        <span class="font-semibold text-black">
          <span class="chrissy">Chrissy</span> <span class="text-stroke-2">in Osaka</span>
        </span>
      </h2>
      <div class="font-tertiary flex flex-col gap-1">
        <h3 class="text-white bg-amber-600 w-fit">lineup</h3>
        <ul class="flex flex-wrap gap-x-4 gap-y-1">
          <li
            v-for="artist in data.guests" :key="artist"
            class="text-lg md:text-3xl lg:text-2xl xl:text-3xl before:content-['/'] before:text-white/30"
          >
            <span>
              {{ artist.name }}
            </span>
            <span class="text-slate-600">
              {{ artist.act }}
            </span>
          </li>          <li
            v-for="artist in data.locals" :key="artist"
            class="text-lg md:text-3xl lg:text-2xl xl:text-3xl before:content-['/'] before:text-white/30"
          >
            <span>
              {{ artist.name }}
            </span>
            <span class="text-slate-600">
              {{ artist.act }}
            </span>
          </li>
        </ul>
      </div>
      <img :src="Flyer" alt="flyer" class="flyer self-center aspect-square w-[100px] lg:w-[200px] object-cover" />
      <div class="font-secondary">
        <div class="metas">
          <div class="meta">
            <span class="meta-key">VENUE</span>
            <span class="devide"></span>
            <span class="meta-val">{{ data.venue }}</span>  
          </div>
          <div class="meta">
            <span class="meta-key">DATE</span>
            <span class="devide"></span>
            <span class="meta-val">{{ data.date }} {{ data.time}}</span>  
          </div>
          <div class="meta">
            <span class="meta-key">CHARGE</span>
            <span class="devide"></span>
            <span class="meta-val">
              <span v-for="charge in data.charges" :key="charge">
                {{ charge.type }} {{ charge.money }}<small class="text-[.8em]">{{ charge.unit }}</small>
                </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="sass" scoped>

@property --rotation
  syntax: "<angle>"
  initial-value: 0deg
  inherits: false

@keyframes colorRotate
  0%
    --rotation: 90deg
  100%
    --rotation: 450deg
@keyframes colorSlide
  0%
    background-position: 200% 100%
  100%
    background-position: 0 0 
.chrissy
  background-image: linear-gradient(to left top, #12c2e9, #79CBCA, #c471ed, #E684AE,#f64f59, #77A1D3, #12c2e9,)
  animation: colorSlide 2s linear infinite
  background-repeat: repeat
  background-size: 200% 100%
  @screen md
    background-image: conic-gradient(from var(--rotation), #12c2e9, #79CBCA, #c471ed, #E684AE,#f64f59, #77A1D3, #12c2e9,)
    animation: colorRotate 1s linear infinite
  padding-bottom: .11em
  color: transparent
  background-clip: text
  display: inline-block
  -webkit-text-stroke: 1px #FFF
  background-position: bottom
  
.flyer
  -webkit-box-reflect: below 0 linear-gradient( transparent, rgba(black,.3) )
  border-top: 1px solid black
  border-right: 1px solid black
  box-shadow: 5px -5px 0 1px black, 7px -7px 0 1px #659779
  @apply skew-y-3 translate-y-4
.metas
  @apply flex flex-col gap-2 md:gap-4
.meta
  width: fit-content
  @apply md:flex  gap-1 md:gap-3 md:items-center
  .meta-key
    @apply w-fit bg-white text-black font-tertiary text-sm mr-2 md:mr-0
  .meta-val
    @apply font-secondary text-base md:text-lg
  .devide
    width: 2px
    @apply bg-white h-3 hidden
</style>
