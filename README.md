#vScroller.js
An vertical list scroller that scrolls through content if it does not fit inside parent.

##Dependency
1. jQuery 1.4+

##Usage
	<div class="list-container">
	   <div class="list">
	      <span>Item 1</span>
	      <span>Item 2</span>
	      ....
	      <span>Item 25</span>
	   </div>
	</div>

	$('.list-container .list').vscroller([options]);

##Options
**direction**: Direction to scroll the content. Value can be <code>up/down</code>. Default is <code>'up'</code>.

**interval**: Higher interval means slower scrolling speed. Default is 35.

**pauseOnHover**: Whether to pause scrolling on mouseover. Value can be <code>true/false</code>. Default is <code>true</code>.
