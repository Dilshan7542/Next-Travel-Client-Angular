export class ChildService{
  onSelect(input: HTMLInputElement, parent: HTMLElement) {

    parent.childNodes.forEach((e,index)=>{
      if(parent.childNodes.length-1===index){
        return;
      }
      (<HTMLElement> e).style.backgroundColor="rgba(255,255,255,0.42)";
      (<HTMLInputElement> e.lastChild?.lastChild?.lastChild).checked=false;
    });
    input.checked=true;
    // @ts-ignore
    let element= input.parentElement.parentElement.parentElement;
    if(element!==null){
      element.style.zIndex="100";
      element.style.backgroundColor="rgba(53,120,248,0.25)";
    }

  }
}
