//基本封面对象

var H5PageFace = function(name) {
	
	this.el = $('<div class="section h5_page h5_page_face h5_page_face_'+name+'"></div>');

	this.addComponent = function(name, cfg) {
			var cfg = cfg || {};
			cfg = $.extend({
				type: 'base'
			},cfg);

			var component;
			switch(cfg.type) {
				case 'base':
					component = new H5ComponentBase(name, cfg);
					break;
        case 'today_brief':
          component = new H5ComponentTodayBrief(name, cfg);
          break;
				default:
			}
			this.el.append(component);

			return this;
		}


	this.addComponent('name', {
  	  	type: 'base',
  	  	text: '水瓶座',
  	  	width: 116,
  	  	height: 365,
  	  	css: {
  	  		top: -50,
  	  		right: 80,
  	  		color: '#fff',
  	  		fontSize: 58,
  	  		fontFamily: 'STSong',
  	  		opacity: 0
  	  	},
  	  	animateIn: {
  	  		opacity: 1,
  	  		top: 50
  	  	},
  	  	animateOut: {
  	  		opacity: 0,
  	  		top: -50
  	  	},
  	  })
  	  .addComponent('line', {
  	  	width: 2,
		height: 521,
		css: {
			left: 350,
			top: 100,
			backgroundColor: '#fff',
			opacity: 0
		},
		animateIn: {
			opacity: 1
		},
		animateOut: {
			opacity: 0
		},
		animateDelay: 1300
  	  })
  	  .addComponent('nameEn', {
  	  	type: 'base',
  	  	text: 'Aquarius',
  	  	height: 56,
  	  	css: {
  	  		top: 164,
  	  		right: 0,
  	  		color: '#fff',
  	  		fontSize: 28,
  	  		textOrientation: 'sideways',
  	  		opacity: 0,
  	  		transform: 'rotate(90deg)'
  	  	},
  	  	animateIn: {
  	  		opacity: 1,
  	  		top: 164,
  	  		right: -24
  	  	},
  	  	animateOut: {
  	  		opacity: 0,
  	  		right: 0
  	  	},
  	  	animateDelay: 500
  	  })
  	  .addComponent('star', {
  	  	type: 'base',
  	  	width: 402,
  	  	height: 461,
  	  	css: {
  	  		top: 100,
  	  		left: 50,
  	  		opacity: 0
  	  	},
  	  	bg: '../imgs/stars/aquarius_star.png',
  	  	animateIn: {
  	  		opacity: 1
  	  	},
  	  	animateOut: {
  	  		opacity: 0
  	  	},
  	  	animateDelay: 1000
  	  })
  	  .addComponent('icon', {
  	  	type: 'base',
  	  	width: 320,
  	  	height: 347,
  	  	css: {
  	  		top: 350,
  	  		opacity: 0
  	  	},
  	  	animateIn: {
  	  		opacity: 1,
  	  	},
  	  	animateOut: {
  	  		opacity: 0,
  	  	},
  	  	animateDelay: 1500,
  	  	bg: '../imgs/icons/Aquarius_icon.png',
  	  	center: true
  	  })
  	  .addComponent('phrase', {
  	  	type: 'base',
  	  	text: '水乳交融',
  	  	width: 80,
  	  	height: 200,
  	  	css: {
  	  		bottom: 80,
  	  		color: '#fff',
  	  		paddingLeft: 6,
  	  		boxSizing: 'border-box',
  	  		fontSize: 24,
  	  		fontFamily: 'STSong',
  	  		borderTop: 0,
  	  		borderRight: 1,
  	  		borderBottom: 0,
  	  		borderLeft: 1,
  	  		borderStyle: 'solid',
  	  		borderColor: '#fff',
  	  		opacity: 0
  	  	},
  	  	animateIn: {
  	  		opacity: 1
  	  	},
  	  	animateOut: {
  	  		opacity: 0
  	  	},
  	  	animateDelay: 2300,
  	  	center: true
  	  });




	return this.el;
}