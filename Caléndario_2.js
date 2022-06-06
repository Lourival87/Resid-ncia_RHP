var  cal  =  {
  // (A) PROPRIEDADES
  // (A1) CALENDÁRIO COMUM
  sMon : false ,  // Semana começa na segunda-feira?
  mName : [ "Jan" ,  "Fev" ,  "Mar" ,  "Abr" ,  "Mai" ,  "Jun" ,  "Jul" ,  "Ago" ,  "Set" ,  "Out" ,  "Nov" ,  "Dez" ] ,  // Nomes dos meses

  // (A2) DADOS DO CALENDÁRIO
  data : null ,  // Eventos para o período selecionado
  sDay : 0 ,  sMth : 0 ,  sYear : 0 ,  // Dia, mês, ano selecionado atual

  // (A3) ELEMENTOS HTML COMUNS
  hMth : null ,  hYear : null ,  // seletor de mês/ano
  hForm : null ,  hfHead : null ,  hfDate : null ,  hfTxt : null ,  hfDel : null ,  // formulário de evento

  // (B) INICIAR CALENDÁRIO
  init : ( )  =>  {
    // (B1) GET + SET COMUNS ELEMENTOS HTML
    cal . hMth  =  documento . getElementById ( "cal-mth" ) ;
    cal . hAno  =  documento . getElementById ( "cal-ano" ) ;
    cal . hForm  =  documento . getElementById ( "cal-evento" ) ;
    cal . hfHead  =  documento . getElementById ( "evt-head" ) ;
    cal . hfData  =  documento . getElementById ( "data-evt" ) ;
    cal . hfTxt  =  documento . getElementById ( "evt-details" ) ;
    cal . hfDel  =  documento . getElementById ( "evt-del" ) ;
    documento . getElementById ( "evt-close" ) . onclick  =  cal . fechar ;
    cal . hfDel . onclick  =  cal . del ;
    cal . hFormulário . onsubmit  =  cal . salvar ;

    // (B2) DATA AGORA
    let  now  =  new  Date ( ) ,
        agoraMth  =  agora . getMês ( ) ,
        nowYear  =  parseInt ( agora.getFullYear ( ) ) ; _ _

    // (B3) ANEXO SELETOR DE MESES
    for  ( seja  i = 0 ;  i < 12 ;  i ++ )  {
      deixe  opt  =  document . createElement ( "opção" ) ;
      opt . valor  =  e ;
      opt . innerHTML  =  cal . mNome [ i ] ;
      if  ( i == nowMth )  {  opt . selecionado  =  verdadeiro ;  }
      cal . hMth . appendChild ( opt ) ;
    }
    cal . hMth . mudança  =  cal . lista ;

    // (B4) ANEXO SELETOR DE ANOS
    // Definido como intervalo de 10 anos. Altere isso como quiser.
    for  ( deixe  i = agoraAno - 10 ;  i <= agoraAno + 10 ;  i ++ )  {
      deixe  opt  =  document . createElement ( "opção" ) ;
      opt . valor  =  e ;
      opt . innerHTML  =  i ;
      if  ( i == nowYear )  {  opt . selecionado  =  verdadeiro ;  }
      cal . hAno . appendChild ( opt ) ;
    }
    cal . hAno . mudança  =  cal . lista ;

    // (B5) INICIAR - DESENHAR CALENDÁRIO
    cal . lista ( ) ;
  } ,

  // (C) CALENDÁRIO DE SORTEIO PARA MÊS SELECIONADO
  lista : ( )  =>  {
    // (C1) CÁLCULOS BÁSICOS - DIAS NO MÊS, DIA DE INÍCIO + DIA DE FIM
    // Nota - Jan é 0 & Dez é 11
    // Nota - Dom é 0 e Sáb é 6
    cal . sMth  =  parseInt ( cal . hMth . value ) ;  // mês selecionado
    cal . sYear  =  parseInt ( cal . hYear . value ) ;  // ano selecionado
    let  daysInMth  =  new  Date ( cal . sYear ,  cal . sMth + 1 ,  0 ) . getDate ( ) ,  // número de dias no mês selecionado
        startDay  =  new  Date ( cal . sYear ,  cal . sMth ,  1 ) . getDay ( ) ,  // primeiro dia do mês
        endDay  =  new  Date ( cal . sYear ,  cal . sMth ,  daysInMth ) . getDay ( ) ,  // último dia do mês
        now  =  new  Date ( ) ,  // data atual
        agoraMth  =  agora . getMonth ( ) ,  // mês atual
        nowYear  =  parseInt ( now . getFullYear ( ) ) ,  // ano atual
        agoraDia  =  cal . sMth == nowMth  &&  cal . sAno == agoraAno ? agora . getData ( ) : null  ;

    // (C2) CARREGAR DADOS DO LOCALSTORAGE
    cal . data  =  localStorage . getItem ( "cal-"  +  cal . sMth  +  "-"  +  cal . sYear ) ;
    if  ( cal . data == null )  {
      localStorage . setItem ( "cal-"  +  cal . sMth  +  "-"  +  cal . sYear ,  "{}" ) ;
      cal . dados  =  { } ;
    }  else  {  cal . dados  =  JSON . parse ( cal.dados ) ; _ _ } 

    // (C3) CÁLCULOS DE DESENHO
    // Quadrados em branco antes do início do mês
    deixe  quadrados  =  [ ] ;
    if  ( cal . sMon  &&  startDay  !=  1 )  {
      deixe  espaços em branco  =  startDay == 0 ? 7 : dia de início  ;
      for  ( deixe  i = 1 ;  i < espaços em branco ;  i ++ )  {  quadrados . empurre ( "b" ) ;  }
    }
    if  ( ! cal . sMon  &&  startDay  !=  0 )  {
      for  ( let  i = 0 ;  i < startDay ;  i ++ )  {  squares . empurre ( "b" ) ;  }
    }

    // Dias do mês
    for  ( deixe  i = 1 ;  i <= diasInMth ;  i ++ )  {  squares . empurre ( i ) ;  }

    // Quadrados em branco após o final do mês
    if  ( cal . sMon  &&  endDay  !=  0 )  {
      deixe  espaços em branco  =  endDay == 6 ? 1 : 7 - fimDia ;
      for  ( deixe  i = 0 ;  i < espaços em branco ;  i ++ )  {  quadrados . empurre ( "b" ) ;  }
    }
    if  ( ! cal . sMon  &&  endDay  !=  6 )  {
      deixe  espaços em branco  =  endDay == 0 ? 6 : 6 - fimDia ;
      for  ( deixe  i = 0 ;  i < espaços em branco ;  i ++ )  {  quadrados . empurre ( "b" ) ;  }
    }

    // (C4) DESENHA CALENDÁRIO HTML
    //Pega o container
    deixe  recipiente  =  documento . getElementById ( "cal-container" ) ,
    cTabela  =  documento . createElement ( "tabela" ) ;
    cTabela . id  =  "calendário" ;
    recipiente . innerHTML  =  "" ;
    recipiente . appendChild ( cTabela ) ;

    // Primeira linha - nomes dos dias
    deixe  cRow  =  document . createElement ( "tr" ) ,
        dias  =  [ "Dom" ,  "Seg" ,  "Ter" ,  "Qua" ,  "Qui" ,  "Sex" ,  "Sab" ] ;
    if  ( cal.sMon ) { dias . _ _ push ( dias . turno ( ) ) ; }   
    for  ( seja  d  de  dias )  {
      deixe  cCell  =  documento . createElement ( "td" ) ;
      cCel . innerHTML  =  d ;
      cRow . appendChild ( cCell ) ;
    }
    cRow . classList . add ( "cabeça" ) ;
    cTabela . appendChild ( cRow ) ;

    // Dias no mês
    deixe  total  =  quadrados . comprimento ;
    cLinha  =  documento . createElement ( "tr" ) ;
    cRow . classList . add ( "dia" ) ;
    for  ( deixe  i = 0 ;  i < total ;  i ++ )  {
      deixe  cCell  =  documento . createElement ( "td" ) ;
      if  ( quadrados [ i ] == "b" )  {  cCell . classList . add ( "em branco" ) ;  }
      senão  {
        if  ( nowDay == squares [ i ] )  {  cCell . classList . add ( "hoje" ) ;  }
        cCel . innerHTML  =  `<div class="dd"> ${ quadrados [ i ] } </div>` ;
        if  ( cal . data [ quadrados [ i ] ] )  {
          cCel . innerHTML  +=  "<div class='evt'>"  +  cal . dados [ quadrados [ i ] ]  +  "</div>" ;
        }
        cCel . onclick  =  ( )  =>  {  cal . mostrar ( cCell ) ;  } ;
      }
      cRow . appendChild ( cCell ) ;
      if  ( i != 0  &&  ( i + 1 ) % 7 == 0 )  {
        cTabela . appendChild ( cRow ) ;
        cLinha  =  documento . createElement ( "tr" ) ;
        cRow . classList . add ( "dia" ) ;
      }
    }

    // (C5) REMOVER QUALQUER DOCKET DE EVENTO ADICIONAR/EDITAR ANTERIOR
    cal . fechar ( ) ;
  } ,

  // (D) MOSTRAR DOCKET DE EVENTO DE EDIÇÃO PARA DIA SELECIONADO
  mostrar : ( el )  =>  {
    // (D1) BUSCAR DADOS EXISTENTES
    cal . sDia  =  el . getElementsByClassName ( "dd" ) [ 0 ] . interiorHTML ;
    vamos  editar  =  cal . dados [ cal . sDia ]  !==  indefinido  ;

    // (D2) ATUALIZAR FORMULÁRIO DE EVENTO
    cal . hfTxt . valor  =  éEditar ? cal . dados [ cal . sDia ] : ""  ;
    cal . hfHead . innerHTML  =  isEdit ? "Editar evento" : "Adicionar evento"  ;
    cal . hfData . innerHTML  =  ` ${ cal . sDia }  ${ cal . mNome [ cal . sMth ] }  $ { cal . sAno } ` ;
    if  ( isEdit )  {  cal . hfDel . classList . remove ( "ninja" ) ;  }
    senão  {  cal . hfDel . classList . add ( "ninja" ) ;  }
    cal . hFormulário . classList . remove ( "ninja" ) ;
  } ,

  // (E) FECHAR DOCUMENTO DO EVENTO
  fechar : ( )  =>  {
    cal . hFormulário . classList . add ( "ninja" ) ;
  } ,

  // (F) SALVAR EVENTO
  salve : ( )  =>  {
    cal . dados [ cal . sDia ]  =  cal . hfTxt . valor ;
    localStorage . setItem ( ` cal - $ { cal . sMth } - $ { cal . sYear } ` ,  JSON.stringify ( cal.data ) ) ;
    cal . lista ( ) ;
    retornar  falso ;
  } ,

  // (G) EXCLUIR EVENTO PARA DATA SELECIONADA
  del : ( )  =>  {  if  ( confirm ( "Deletar evento?" ) )  {
    excluir  cal . dados [ cal . sDia ] ;
    localStorage . setItem ( ` cal - $ { cal . sMth } - $ { cal . sYear } ` ,  JSON.stringify ( cal.data ) ) ;
    cal . lista ( ) ;
  } }
} ;
janela . addEventListener ( "load" ,  cal . init ) ; 