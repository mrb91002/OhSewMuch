console.log('inputed');


$(document).ready(function(){
     $('.parallax').parallax();
   });

let superman = document.getElementById('superman');
let loop;
let end = false;

window.addEventListener('scroll', function() {
  topDistance = window.pageYOffset;
  console.log(topDistance);

  console.log(superman.offsetLeft);

    if (topDistance === 100) {
      console.log('scrolled to 100');
    }
    else if (topDistance <= 2650) {
      superman.className="superman-hide";
      loop = false;
      end = true;
    }
    else if (topDistance >= 2651
      //  && topDistance <= 2750
    ) {
      end = false;
      superman.className="superman-show";
      if (loop !== true) {
        loop = true;

        loopIt()
      }
    }
});

function loopIt() {
  let direction = 1;
  let movement = 1;
  let moveIt = setInterval(() => {
    console.log(superman.offsetLeft);
    console.log(movement);
    movement += direction;

      translate3d = `translate3d(${movement + 'px'}, 0, 0)`;
      // translate3d = `translate3d(${movement + 'px'}, ${movement + -490 + 'px'}, 0)`;

      // superman.style.transform = "rotate(-90deg)";
        superman.style['-webkit-transform'] = translate3d;
        superman.style['-moz-transform'] = translate3d;
        superman.style['-ms-transform'] = translate3d;
        superman.style['-o-transform'] = translate3d;
        superman.style.transform = translate3d;

        if (superman.offsetLeft + movement < 300) {
          // superman.className="superman-show-left";
          // superman.className="superman-show";
          direction = 1;
        }

        if (superman.offsetLeft + movement > 1200) {
          direction = -1;
        }

        if (end == true) {
          clearInterval(moveIt);
        }
      }, 5);

      moveIt();
};
