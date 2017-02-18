import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import model.DrawInfo;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Created by Ivan on 16.02.2017.
 */
public class Test {
    public static void main(String[] args) throws IOException {
        /*
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.enable(SerializationFeature.INDENT_OUTPUT);

        List<DrawInfo> personList = Stream.of(
                new DrawInfo("60:21:C0:2A:E0:33", "START", 34.0 , 33.0),
                new DrawInfo("60:21:C0:2A:E0:33", "MOVE", 34.0 , 33.0))
                .collect(Collectors.toList());

        //1. Convert List of Person objects to JSON
        String arrayToJson = objectMapper.writeValueAsString(personList);
        System.out.println("1. Convert List of person objects to JSON :");
        System.out.println(arrayToJson);

        TypeReference<List<DrawInfo>> mapType = new TypeReference<List<DrawInfo>>() {};
        List<DrawInfo> jsonToPersonList = objectMapper.readValue(arrayToJson, mapType);
        System.out.println("\n2. Convert JSON to List of person objects :");

        //Print list of person objects output using Java 8
        jsonToPersonList.forEach(System.out::println);
        */
    }
}
