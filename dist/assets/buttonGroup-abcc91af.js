import{S as a}from"./index-41c3c3d0.js";import{E as l,a as d}from"./index-bea6d51e.js";import{_,r as n,o as i,c,a as e,b as t,m as u,F as p}from"./index-d420b9fe.js";const b={components:{EditorContent:l},data(){return{editor:null}},mounted(){this.editor=new d({extensions:[a],content:`
        <h2>
          Hi there,
        </h2>
        <p>
          this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
        </p>
        <ul>
          <li>
            That’s a bullet list with one …
          </li>
          <li>
            … or two list items.
          </li>
        </ul>
        <p>
          Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
        </p>
        <pre><code class="language-css">body {
  display: none;
}</code></pre>
        <p>
          I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
        </p>
        <blockquote>
          Wow, that’s amazing. Good work, boy! 👏
          <br />
          — Mom
        </blockquote>
      `})},beforeUnmount(){this.editor.destroy()}},h={key:0},m={class:"button-container"},f={class:"button-column"},v={class:"button-column"},y={class:"button-column"},w={class:"centered-button"},k={class:"button-row"},g={class:"button-row"},x={class:"button-column"},B={class:"button-row"},I={class:"button-row"},E={class:"button-column"};function G(C,N,S,V,s,q){const o=n("el-button"),r=n("editor-content");return i(),c(p,null,[s.editor?(i(),c("div",h,[e("div",m,[e("div",f,[t(o),t(o),t(o)]),e("div",v,[t(o),t(o)]),e("div",y,[e("div",w,[t(o)]),e("div",k,[t(o),t(o),t(o)]),e("div",g,[t(o),t(o),t(o)])]),e("div",x,[e("div",B,[t(o),t(o),t(o)]),e("div",I,[t(o),t(o),t(o)])]),e("div",E,[t(o),t(o)])])])):u("",!0),t(r,{editor:s.editor},null,8,["editor"])],64)}const A=_(b,[["render",G],["__scopeId","data-v-fbfeee6b"]]);export{A as default};
