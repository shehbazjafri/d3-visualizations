(window["webpackJsonpd3-visualizations"]=window["webpackJsonpd3-visualizations"]||[]).push([[0],{59:function(t,a,e){t.exports=e(76)},64:function(t,a,e){},65:function(t,a,e){},66:function(t,a,e){},67:function(t,a,e){},76:function(t,a,e){"use strict";e.r(a);var n=e(0),r=e.n(n),i=e(42),o=e.n(i),c=(e(64),e(6)),l=e(45),s=e(1);e(65);function u(){return Object(n.useEffect)(function(){!function(){var t=s.n("#barchart").append("svg").attr("width",800).attr("height",600),a=s.i().range([0,600]).padding(.4),e=s.j().range([400,0]),n=s.a(a),r=s.b(e),i=t.append("g").attr("transform","translate(".concat(100,",",100,")")),o=s.n("#barchart").append("div").attr("class","tooltip").attr("id","tooltip").style("opacity",0);s.f("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json").then(function(t){a.domain(t.data.map(function(t){return t[0]})),e.domain([0,s.g(t.data,function(t){return t[1]})]);var c=Math.round(t.data.length/14);i.append("g").attr("id","x-axis").attr("transform","translate(0,".concat(400,")")).call(n.tickFormat(function(t){return t.split("-")[0]}).tickValues(t.data.map(function(t,a){return a%c===0?t[0]:void 0}).filter(function(t){return t}))),i.append("g").attr("id","y-axis").call(r.tickFormat(function(t){return t}).ticks(10)).append("text").attr("class","ticks").attr("y",6).attr("dy","0.71em").attr("text-anchor","end").text("value"),i.selectAll(".bar").data(t.data).enter().append("rect").attr("class","bar").attr("data-date",function(t){return t[0]}).attr("data-gdp",function(t){return t[1]}).attr("x",function(t){return a(t[0])}).attr("y",function(t){return e(t[1])}).attr("width",a.bandwidth()).attr("height",function(t){return 400-e(t[1])}).on("mouseover",function(t){o.transition().duration(200).style("opacity",.9),o.html(t[0]+": "+t[1]).style("left",s.c.pageX+20+"px").style("top",s.c.pageY+20+"px"),o.attr("data-date",t[0])}).on("mouseout",function(t){o.transition().duration(400).style("opacity",0)})})}()},[]),r.a.createElement("div",{className:"container"},r.a.createElement("header",{id:"title"},r.a.createElement("h1",null,"Bar Chart")),r.a.createElement("div",{id:"barchart"}))}e(66);function d(){return Object(n.useEffect)(function(){!function(){var t=s.n("#scatterplot").append("svg").attr("width",900).attr("height",600),a=s.j().range([0,700]),e=s.l().range([0,400]),n=s.a(a),r=s.b(e),i=t.append("g").attr("transform","translate(".concat(100,",",100,")")),o=s.k(s.m);s.f("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json").then(function(c){var l=s.o("%M:%S");c.forEach(function(t){t.Place=+t.Place;var a=t.Time.split(":");t.Time=new Date(1970,0,1,0,a[0],a[1])});var u=c.map(function(t){return t.Year});a.domain([s.h(u)-1,s.g(u)+1]),e.domain(s.d(c,function(t){return t.Time}));var d=s.n("body").append("div").attr("class","tooltip").attr("id","tooltip").style("opacity",0);i.append("g").attr("id","x-axis").attr("transform","translate(0,".concat(400,")")).call(n.tickFormat(s.e("d"))).append("text").attr("class","x-axis-label").attr("x",700).attr("y",-6).style("text-anchor","end").text("Year"),i.append("g").attr("id","y-axis").call(r.tickFormat(l)).append("text").attr("class","label").attr("transform","rotate(-90)").attr("y",6).attr("dy",".71em").style("text-anchor","end").text("Best Time (minutes)"),i.selectAll("circle").data(c).enter().append("circle").attr("class","dot").attr("data-xvalue",function(t){return t.Year}).attr("data-yvalue",function(t){return t.Time.toISOString()}).attr("cx",function(t){return a(t.Year)}).attr("cy",function(t){return e(t.Time)}).attr("r",6).style("fill",function(t){return o(""!==t.Doping)}).on("mouseover",function(t){d.style("opacity",.9),d.attr("data-year",t.Year),d.html(t.Name+": "+t.Nationality+"<br/>Year: "+t.Year+", Time: "+l(t.Time)+(t.Doping?"<br/><br/>"+t.Doping:"")).style("left",s.c.pageX+"px").style("top",s.c.pageY-28+"px")}).on("mouseout",function(t){d.style("opacity",0)}),t.append("text").attr("id","title").attr("x",350).attr("y",-100).attr("text-anchor","middle").style("font-size","30px").text("Doping in Professional Bicycle Racing"),t.append("text").attr("x",350).attr("y",-75).attr("text-anchor","middle").style("font-size","20px").text("35 Fastest times up Alpe d'Huez");var p=t.selectAll(".legend").data(o.domain()).enter().append("g").attr("class","legend").attr("id","legend").attr("transform",function(t,a){return"translate(0,"+(200-20*a)+")"});p.append("rect").attr("x",682).attr("width",18).attr("height",18).style("fill",o),p.append("text").attr("x",676).attr("y",9).attr("dy",".35em").style("text-anchor","end").text(function(t){return t?"Riders with doping allegations":"No doping allegations"})})}()},[]),r.a.createElement("div",{className:"container"},r.a.createElement("header",null,r.a.createElement("h1",null,"Scatterplot Graph")),r.a.createElement("div",{id:"scatterplot"}))}e(67);function p(t){var a=function(a){t.history.push("/".concat(a))};return r.a.createElement("div",{className:"App"},r.a.createElement(c.a,{exact:!0,path:"/",render:function(t){return r.a.createElement(r.a.Fragment,null,r.a.createElement("header",null,"D3 Visualizations"),r.a.createElement("div",{className:"visualization-selectors"},r.a.createElement("button",{className:"button",onClick:function(){return a("bar-chart")}},"Bar Chart"),r.a.createElement("button",{className:"button",onClick:function(){return a("scatterplot-graph")}},"Scatterplot Graph")))}}),r.a.createElement(c.a,{path:"/bar-chart",render:function(t){return r.a.createElement(u,null)}}),r.a.createElement(c.a,{path:"/scatterplot-graph",render:function(t){return r.a.createElement(d,null)}}))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(function(){return r.a.createElement(l.a,{basename:"/d3-visualizations"},r.a.createElement(c.a,{component:p}))},null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[59,1,2]]]);
//# sourceMappingURL=main.e2f3a8a6.chunk.js.map