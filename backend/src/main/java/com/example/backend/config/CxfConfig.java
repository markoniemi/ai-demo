package com.example.backend.config;

import com.example.backend.rest.NoteResource;
import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;
import org.apache.cxf.Bus;
import org.apache.cxf.endpoint.Server;
import org.apache.cxf.jaxrs.JAXRSServerFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class CxfConfig {

  @Bean
  public Server rsServer(Bus bus, NoteResource noteResource) {
    JAXRSServerFactoryBean endpoint = new JAXRSServerFactoryBean();
    endpoint.setBus(bus);
    endpoint.setServiceBeans(Arrays.asList(noteResource));
    endpoint.setAddress("/");
    endpoint.setProvider(new JacksonJsonProvider());
    return endpoint.create();
  }
}
