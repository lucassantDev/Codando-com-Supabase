import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import { supabase } from './conexao';

export default function App() {
  const [descricaoDigitada, setDescricaoDigitada] = useState("");
  const [valorDigitado, setValorDigitado] = useState("");
  const [dados, setDados] = useState([]);
  // função para deletar dados no Banco de Dados
  const deletarConta = async(id) => {
      const {error} = await supabase.from('tb_contas').delete().match({id})

      if(error){
          alert('Falha ao deletar!')
      }else{
        alert('Conta deletada com sucesso!')
        consultarDados()
      }
  }


  // função para consultar os dados no Banco de Dados
  const consultarDados  = async() =>{
    const{data, error} = await supabase.from('tb_contas').select('*')

    if(error){
        alert('Falha ao consultar os dados!')
    }else{
        setDados(data);

    }
  }


  // Criar uma função para inserir no Banco de dados
  const cadastrarConta = async(desc, vl)=>{
    if(desc == '' || vl ==  ''){
        alert('Preeencha todos os campos')
    }else{

      const {error} = await supabase.from("tb_contas")
      .insert({coluna_descricao: desc, coluna_valor: vl, coluna_status: false});

      if(error){
        alert("Falha ao cadastrar!")
      }else{
        alert("Cadastrado com sucesso!")
        consultarDados()
      }
  }

  }
  
  useEffect(() => {
    consultarDados();
  }, []);



  return (
    <View style={styles.container}>
      
      <Text style={{fontSize: 35}}>Contas a Pagar</Text>
      <TextInput
        style={styles.caixaDeTexto}
        placeholder='Descrição aqui'
        onChangeText={(texto)=>setDescricaoDigitada(texto)}
      />
      <TextInput
        style={styles.caixaDeTexto}
        placeholder='Valor aqui'
        onChangeText={(texto)=>setValorDigitado(texto)}
      />
      <Button
        title="Cadastrar"
        onPress={()=>{cadastrarConta(descricaoDigitada, valorDigitado)}}
      />
      <ScrollView style={{width: "100%"}}>
        
          {dados.map((item)=>(
            <View style={styles.caixaContas}>
            <Text>Nº {item.id}</Text>
            <Text>{item.coluna_descricao}</Text>
            <Text>R$ {item.coluna_valor}</Text>
            <Button
              title='Excluir'
              onPress={()=>{deletarConta(item.id)}}

            />
          </View> 
          ))}
      </ScrollView>


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  caixaDeTexto:{
    borderWidth: 1,
    width: "90%",
    padding: 10,
    margin: 15,
    borderRadius: 5
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 50
  },
  caixaContas:{
    width: '90%',
    minHeight: 70,
    borderWidth: 1,
    borderCoor: '#b2b2b2',
    droderRadius: 8,
    margin: 30,
    padding: 10


  }
});