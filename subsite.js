(function(){
  const grids = document.querySelectorAll('.subsite--grid .reel');
  if(!grids.length) return;

  function sizeGrid(grid){
    if(window.matchMedia('(max-width:560px)').matches){
      grid.style.removeProperty('--cell');
      return;
    }
    const columns = window.matchMedia('(min-width:901px)').matches ? 3 : 2;
    const styles = getComputedStyle(grid);
    const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
    const inner = grid.clientWidth - (parseFloat(styles.paddingLeft) || 0) - (parseFloat(styles.paddingRight) || 0);
    const cell = (inner - gap * (columns - 1)) / columns;
    if(cell > 0) grid.style.setProperty('--cell', cell + 'px');
  }

  const resize = () => grids.forEach(sizeGrid);
  resize();
  window.addEventListener('resize', resize, {passive:true});
  window.addEventListener('load', resize, {once:true});
})();
