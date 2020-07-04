package br.com.ftt.stockmanager.controller;

import br.com.ftt.stockmanager.dto.brand.BrandRequestDTO;
import br.com.ftt.stockmanager.dto.brand.BrandResponseDTO;
import br.com.ftt.stockmanager.model.Brand;
import br.com.ftt.stockmanager.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/brand")
public class BrandController {
    @Autowired
    private BrandRepository brandRepository;

    @CrossOrigin
    @GetMapping
    public List<BrandResponseDTO> index(){
        var brand = brandRepository.findAll();

        return brand
                .stream()
                .map(BrandResponseDTO::parse)
                .collect(Collectors.toList());
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<BrandResponseDTO> show(@PathVariable("id") Long id) {
        var brand = brandRepository.findById(id);
        if(!brand.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(BrandResponseDTO.parse(brand.get()));
    }

    @CrossOrigin
    @PostMapping
    @Transactional
    public ResponseEntity<BrandResponseDTO> store(@RequestBody @Valid BrandRequestDTO brandToInsert, UriComponentsBuilder uriComponentsBuilder) {
        var brand = new Brand();

        brand.setName(brandToInsert.getName());
        brand.setDescription(brandToInsert.getDescription());

        brandRepository.save(brand);

        var uri = uriComponentsBuilder
                .path("/brand/{id}")
                .buildAndExpand(brand.getId())
                .toUri();
        return ResponseEntity.created(uri).body(BrandResponseDTO.parse(brand));
    }

    @CrossOrigin
    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<BrandResponseDTO> update(@PathVariable Long id, @RequestBody @Valid BrandRequestDTO brandToUpdate) {
        var hasBrand = brandRepository.findById(id);

        if(!hasBrand.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        var brand = hasBrand.get();

        brand.setName(brandToUpdate.getName());
        brand.setDescription(brandToUpdate.getDescription());

        brandRepository.save(brand);

        return ResponseEntity.ok(BrandResponseDTO.parse(brand));
    }

    @CrossOrigin
    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<?> destroy(@PathVariable Long id) {
        var hasBrand = brandRepository.findById(id);

        if(!hasBrand.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        brandRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
