package br.com.ftt.stockmanager.controller;

import br.com.ftt.stockmanager.dto.category.CategoryResponseDTO;
import br.com.ftt.stockmanager.dto.provider.ProviderRequestDTO;
import br.com.ftt.stockmanager.dto.provider.ProviderResponseDTO;
import br.com.ftt.stockmanager.model.Provider;
import br.com.ftt.stockmanager.repository.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/provider")
public class ProviderController {
    @Autowired
    private ProviderRepository providerRepository;

    @CrossOrigin
    @GetMapping
    public List<ProviderResponseDTO> index() {
        var provider = providerRepository.findAll();

        return provider
                .stream()
                .map(ProviderResponseDTO::parse)
                .collect(Collectors.toList());
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<ProviderResponseDTO> show(@PathVariable Long id) {
        var provider = providerRepository.findById(id);
        if(!provider.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(ProviderResponseDTO.parse(provider.get()));
    }

    @PostMapping
    @CrossOrigin
    @Transactional
    public ResponseEntity<ProviderResponseDTO> store(@RequestBody @Valid ProviderRequestDTO providerToInsert, UriComponentsBuilder uriComponentsBuilder) {
        var provider = new Provider();

        provider.setName(providerToInsert.getName());
        provider.setAddress(providerToInsert.getAddress());
        provider.setCnpj(providerToInsert.getCnpj());

        providerRepository.save(provider);

        var uri = uriComponentsBuilder
                .path("/provider/{id}")
                .buildAndExpand(provider.getId())
                .toUri();
        return ResponseEntity.created(uri).body(ProviderResponseDTO.parse(provider));
    }

    @CrossOrigin
    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<ProviderResponseDTO> update(@PathVariable Long id, @RequestBody @Valid ProviderRequestDTO providerToUpdate) {
        var hasProvider = providerRepository.findById(id);

        if(!hasProvider.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        var provider = hasProvider.get();

        provider.setName(providerToUpdate.getName());
        provider.setAddress(providerToUpdate.getAddress());
        provider.setCnpj(providerToUpdate.getCnpj());

        providerRepository.save(provider);

        return ResponseEntity.ok(ProviderResponseDTO.parse(provider));
    }

    @CrossOrigin
    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<?> destroy(@PathVariable Long id) {
        var hasProvider = providerRepository.findById(id);

        if(!hasProvider.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        providerRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
