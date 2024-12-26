$(window).on("load", function () 
{
    $('#ano').text(new Date().getFullYear());
    $('#rendaMensal').focus();

    $('#BotaoVerificarSituacaoFinanceira').click(function () 
    {
        var RendaMensalValidar = $('#rendaMensal').val().replace(".", "").replace(",", ".");
        var EuinvistoValidar = $('#euinvisto').val().replace(".", "").replace(",", ".");
        var EugastoValidar = $('#eugasto').val().replace(".", "").replace(",", ".");
        var EudevoValidar = $('#eudevo').val().replace(".", "").replace(",", ".");

        if (RendaMensalValidar == '' || isNaN(RendaMensalValidar)) 
        {
            alert("preencha o campo renda mensal com números");
            $('#rendaMensal').val("");
            $('#rendaMensal').focus();
        } 
        else if (EuinvistoValidar == '' || isNaN(EuinvistoValidar)) 
        {
                alert("preencha o campo com quanto investe utilizando números");
                $('#euinvisto').val("");
                $('#euinvisto').focus();
        } 
        else if (EugastoValidar == '' || isNaN(EugastoValidar)) 
        {
                    alert("preencha o campo com quanto gasta utilizando números");
                    $('#eugasto').val("");
                    $('#eugasto').focus();
        } 
        else if (EudevoValidar == '' || isNaN(EudevoValidar)) 
        {
                        alert("preencha o campo com quanto deve utilizando números");
                        $('#eudevo').val("");
                        $('#eudevo').focus();
        } 
        else 
        {
            var RendaMensal = $('#rendaMensal').val();
            $('#rendaMensalTD').text(TransformarEmReais(RendaMensal));
            $('#ResultadoRendaMensalTD').html('<i data-toggle="tooltip" data-placement="top" title="Soma de todas as suas receitas, incluindo freelas e rendas extras." class="icon style3 fa-wallet"></i>');

            var Euinvisto = $('#euinvisto').val();
            $('#euinvistoTD').text(TransformarEmReais(Euinvisto));
            var ResultadoEuinvistoTD = '';
            if(AnalisarSituacaoFinanceiraInvestimento(RendaMensal,Euinvisto))
                ResultadoEuinvistoTD = '<i data-toggle="tooltip" data-placement="top" title="Atingiu o investimento mínimo de 20% do salário." class="icon style5 fa-thumbs-up"></i>';
            else
                ResultadoEuinvistoTD = '<i data-toggle="tooltip" data-placement="top" title="Não atingiu o investimento mínimo de 20% do salário." class="icon style1 fa-thumbs-down"></i>'
            $('#ResultadoEuinvistoTD').html(ResultadoEuinvistoTD);

            var Eugasto = $('#eugasto').val();
            $('#eugastoTD').text(TransformarEmReais(Eugasto));
            var ResultadoEugastoTD = '';
            if(AnalisarSituacaoFinanceiraGasto(RendaMensal,Eugasto))
                ResultadoEugastoTD = '<i data-toggle="tooltip" data-placement="top" title="Você gasta menos do que ganha, parabéns!" class="icon style5 fa-thumbs-up"></i>'
            else
                ResultadoEugastoTD = '<i data-toggle="tooltip" data-placement="top" title="Você gasta mais do que ganha, alguma coisa não está certa!" class="icon style1 fa-thumbs-down"></i>'
            $('#ResultadoEugastoTD').html(ResultadoEugastoTD);

            var Eudevo = $('#eudevo').val();
            $('#eudevoTD').text(TransformarEmReais(Eudevo));
            var ResultadoEudevoTD = '';
            if(AnalisarSituacaoFinanceiraDivida(RendaMensal,Eudevo))
                ResultadoEudevoTD = '<i data-toggle="tooltip" data-placement="top" title="Show, suas dívidas não comprometem uma parte significativa da sua renda!" class="icon style5 fa-thumbs-up"></i>'
            else
                ResultadoEudevoTD = '<i data-toggle="tooltip" data-placement="top" title="Preocupante, suas dívidas comprometem mais do que 30% da sua renda!" class="icon style1 fa-thumbs-down"></i>'
            $('#ResultadoEudevoTD').html(ResultadoEudevoTD);

            var AnaliseSituacaoFinanceira = AnalisarSituacaoFinanceira(RendaMensal,Euinvisto,Eugasto,Eudevo);
            //SituacaoFinanceira
            if(AnaliseSituacaoFinanceira)
                $('#resultadoSituacaoFinanceira').html("<blockquote><i class='icon style5 fa-thumbs-up'></i> Sua situação financeira atual está boa, parabéns. <br/> Você pode potencializar seus resultados, <br/> veja as dicas de como utilizar o método 70/30!</blockquote>");
            else
                $('#resultadoSituacaoFinanceira').html("<blockquote><i class='icon style1 fa-thumbs-down'></i> Sua situação financeira atual pode melhorar, <br/>  veja as dicas que vão te ajudar com o método 70/30.</blockquote>");

            //70/30 macro
            $('#rendaFixaMensal').html("<b>" +  TransformarEmReais(RendaMensalValidar) + "</b>");

            var RendaFixaMensal70 = CalcularPorcentagem(RendaMensal,70);
            $('#rendaFixaMensal70').html("<b>" +  TransformarEmReais(RendaFixaMensal70)+ "</b>");

            var RendaFixaMensal30 = CalcularPorcentagem(RendaMensal,30);
            $('#rendaFixaMensal30').html("<b>" +  TransformarEmReais(RendaFixaMensal30)+ "</b>");


            //70/30 micro
            var RendaFixaMensal55 = CalcularPorcentagem(RendaMensal,55);
            var CustoVida = TransformarEmReais(RendaFixaMensal55);
            $('#paraoessencial').html("<b>" +  CustoVida + "</b>");
            var RendaFixaMensal20 = CalcularPorcentagem(RendaMensal,20);
            var ParaInvestir = TransformarEmReais(RendaFixaMensal20);
            $('#parainvestimentos').html("<b>" +  ParaInvestir + "</b>");
            var RendaFixaMensal10 = CalcularPorcentagem(RendaMensal,10);
            $('#paraaponsentadoria').html("<b>" +  TransformarEmReais(RendaFixaMensal10) + "</b>");
            $('#paragastarcomoquequiser').html("<b>" +  TransformarEmReais(RendaFixaMensal10) + "</b>");
            var RendaFixaMensal5 = CalcularPorcentagem(RendaMensal,5);
            $('#paraeducacao').html("<b>" +  TransformarEmReais(RendaFixaMensal5)+ "</b>");

            //reservaEmergencia

            $('#custoVida').html("Seu custo de vida atual está estimado em <b>" + CustoVida + "</b>");
            var clt = true;
            var TotalReservaEmergencia = CalcularReservaEmergencia(RendaFixaMensal55,clt) 
            $('#totalInvestidoReservaEmergencia').html("O valor total investido na sua reserva de emergência deve ser de <b>" + TransformarEmReais(TotalReservaEmergencia)+ "</b> que equivalem a <em> <u>"+(clt ? 6 : 12)+" meses</u> do seu custo de vida.</em> ");
            $('#sugestaoInvestirParaConcluirReservaEmergencia').html("Sugestão para investir todos os meses <b>" + ParaInvestir+ "</b> no Ativo <i><u>Tesouro SELIC</u> ou <u>CDBs rendendo 100% do CDI</u> com resgate imediato.</i> ");

            $('#situacaofinanceira').click();
        }

    });

    function AnalisarSituacaoFinanceiraInvestimento(euganho,euinvisto) 
    {
        var SituacaoFinanceiraBoa = true;

        var investimentoMinimo = CalcularPorcentagem(euganho,20);
        var investimentoAtual = TransformarEmNumeros(euinvisto);

        if (investimentoAtual < investimentoMinimo)
            SituacaoFinanceiraBoa = false;

            return SituacaoFinanceiraBoa;
    }

    function AnalisarSituacaoFinanceiraGasto(euganho,eugasto) 
    {
        var SituacaoFinanceiraBoa = true;
        
        var Gasto = TransformarEmNumeros(eugasto);
        var Ganho = TransformarEmNumeros(euganho);

        if(Gasto > Ganho)
            SituacaoFinanceiraBoa = false;

            return SituacaoFinanceiraBoa;
    }

    function AnalisarSituacaoFinanceiraDivida(euganho,eudevo) 
    {
        var SituacaoFinanceiraBoa = true;

        var dividaMaxima = CalcularPorcentagem(euganho,30);
        var DividaAtual = TransformarEmNumeros(eudevo);

        if (DividaAtual > dividaMaxima)
            SituacaoFinanceiraBoa = false;

            return SituacaoFinanceiraBoa;
    }

    function AnalisarSituacaoFinanceira(euganho,euinvisto,eugasto,eudevo) 
    {
        var SituacaoFinanceiraInvestimentoBoa = AnalisarSituacaoFinanceiraInvestimento(euganho,euinvisto) 
        var SituacaoFinanceiraGastoBoa = AnalisarSituacaoFinanceiraGasto(euganho,eugasto) 
        var SituacaoFinanceiraDividaBoa = AnalisarSituacaoFinanceiraDivida(euganho,eudevo) 
        
        if(!SituacaoFinanceiraInvestimentoBoa || !SituacaoFinanceiraGastoBoa || !SituacaoFinanceiraDividaBoa)
            return false;
        else
            return true;
    }

    function CalcularReservaEmergencia(custoVida,clt) 
    {
        var Total = 0;
        if(clt)
           Total = custoVida * 6;
        else
           Total = custoVida * 12;

        return ArredondamentoDosCalculos(Total);
    }

    function CalcularPorcentagem(rendaMensal,porcentagem) 
    {
        var Total = 0;
        rendaMensalConvertida = TransformarEmNumeros(rendaMensal);
        Total = rendaMensalConvertida * porcentagem / 100;

        return ArredondamentoDosCalculos(Total);
    }

    function TransformarEmNumeros(valor) 
    {
        ValorPosConversao = valor.replace(".", "").replace(",", ".");
        ValorConvertido = parseFloat(ValorPosConversao);  
        return ValorConvertido;
    }

    function ArredondamentoDosCalculos(Valor) 
    {
        var ValorArredondado = 0;
        
        var ValorArredondado = Valor.toFixed(2);
 
        return ValorArredondado;
    }

    function TransformarEmReais(valor)
    {
        const valorFormatado = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(valor)

        return valorFormatado;
    }

});

