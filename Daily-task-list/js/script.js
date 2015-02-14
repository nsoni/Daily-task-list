
$(function(){
	function init(){	
		var 	mouseX = 0,		// Mouse Position
			mouseY = 0,

			elmX     = 0,		// Element Position 
			elmY     = 0,

			pillers    = $('.pillers'), // Task Container
			dragboxHeight ,
			pillerWidth = $('.pillers:nth-child(1)').width(), // Taks Container width
			flag=true,
			currentElm;  // Current Element
			dummy = $('.temp_box');
		
		/* When Left Mouse Button is Pressed */
		$('.max').on('mousedown', '.dragable', function(e){
			if($(e.target).is('.remove') || $(e.target).is('.edit')){
				if($(e.target).is('.remove')){
					$(this).remove();
				}else{
					editThis($(this));
				}
			}else{
				var temp;
				$(this).addClass('rel');

				mouseX = e.clientX;		// Current Mouse Position and Store it to global variables
				mouseY = e.clientY;
				dragboxHeigth=$(this).outerHeight();
				console.log(dragboxHeigth,"height");

				temp = +($(this).css('left').slice(0, -2));  	// Get Element Position and if it not a number then change it to 0
				elmX = null || isNaN(temp) ? 0 : temp;

				temp = +($(this).css('top').slice(0, -2));
				elmY = null || isNaN(temp) ? 0 : temp;
				
				$(this).css({'z-index':'9999'});  	// Increase the Z-Index of the Element so that it wont be overlapped by other element.

				currentElm = $(this); 		// set the current value so that it could be use by mouse move

				/* Some Hack for not let heighlight the data(Copied from net)  */
				document.body.focus();
				document.onselectstart = function () { return false; }; 
				$(this).ondragstart = function() { return false; }; 
				return false;
			}
		}).mouseup('.dragable', function(e){ 		// This will be fired when Mouse Button release back
			var top_pos = +($('.temp_box').offset().top) -10 ;
			
			if(currentElm !== null){
				currentElm.removeClass('rel').prependTo('.arrived .tasks').css({ 	// Resetting the Position Object
					left: 0,
					top: 0
				});
			$('.temp_box').hide();
				// currentElm.css({'z-index' : '1'});  // Set Z-Index back to normal value.
				currentElm = null;  	// Finally Set the Current Element to null so that it won't get dragged any more
			}else return false;
		}).mousemove('.dragable', function(e){  	// Mouse Move Event .. This is the main part, It will reposition the element with mouse pointer
			if(currentElm !== undefined && currentElm !== null){
				var posY = elmY + e.clientY - mouseY;
				currentElm.addClass('draged').css({  		// This sets the position of div element
					left : (elmX + e.clientX - mouseX)+'px',
					top : (elmY + e.clientY - mouseY)+'px'
				});

				/* Set Appropriate Class to Piller to Which The Element is going to be added */
				if( e.clientX >= $('.pillers:nth-child(1)').offset().left && e.clientX < ($('.pillers:nth-child(1)').offset().left+pillerWidth) && e.clientY < $('.pillers:nth-child(1)').outerHeight()){
					$('.pillers:nth-child(1)').addClass('arrived').siblings('.pillers').removeClass('arrived');
				}else if(e.clientX >= $('.pillers:nth-child(2)').offset().left && e.clientX < ($('.pillers:nth-child(2)').offset().left+pillerWidth) && e.clientY < $('.pillers:nth-child(2)').outerHeight()){
					$('.pillers:nth-child(2)').addClass('arrived').siblings('.pillers').removeClass('arrived');
				}else if(e.clientX >= $('.pillers:nth-child(3)').offset().left && e.clientX < ($('.pillers:nth-child(3)').offset().left+pillerWidth) && e.clientY < $('.pillers:nth-child(3)').outerHeight()){
					$('.pillers:nth-child(3)').addClass('arrived').siblings('.pillers').removeClass('arrived');
				}else if(e.clientX >= $('.pillers:nth-child(4)').offset().left && e.clientX < ($('.pillers:nth-child(4)').offset().left+pillerWidth) && e.clientY < $('.pillers:nth-child(4)').outerHeight()){
					$('.pillers:nth-child(4)').addClass('arrived').siblings('.pillers').removeClass('arrived');
				}

				// row drag set
				dummy.appendTo('.arrived');
				var boxNumber = +(e.clientY/dragboxHeigth);
					boxNumber = Math.floor(boxNumber);
					// console.log($('.arrived').find('.dragable:nth-child('+boxNumber+')'))
					dummy.insertAfter($('.arrived').find('.dragable:nth-child('+boxNumber+')')).show();
			}
		});

		$('body .arrived').on('click', '.remove', function(e){
			$(this).closest('.dragable').remove();
		});

		$('.add_task_button').on('click',function () {
			var place= $(this).closest('.create_task_box'),
				titl=place.find('input#title').val(),
				disc=place.find('textarea#discription').val(),
				time = new Date(),
				format = time.toLocaleDateString();


			if(titl || disc){
				var val = $('.temp').clone(true).removeClass('temp hide').insertBefore(place);
				val.find('#TaskHeading').val(titl).end().find('#task-discription').text(disc).end().find('.time').text(format).css({
					left: 0,
					top: 0
				});
			}
			$('input#title, textarea#discription').val('');
		});

		function editThis($ref){
			$ref=$ref.find('.edit');
			$ref.on('mouseup', function(e){
				e.stopImmediatePropagation();
				if(flag==true){
					$(this).addClass('done');
					var task = $(this).closest('.dragable');
					task.removeClass('dragable').find('input, textarea').removeAttr('readonly').removeClass('readonly');
					flag=false;
				}
				else{
					$(this).removeClass('done');
					$(this).closest('.task-unit').addClass('dragable').find('input, textarea').attr('readonly', 'readonly').addClass('readonly');
					flag=true;
				}
			})
		}

	}

	init();
});


