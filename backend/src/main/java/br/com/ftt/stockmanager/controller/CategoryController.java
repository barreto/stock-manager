package br.com.ftt.stockmanager.controller;

import br.com.ftt.stockmanager.dto.category.CategoryRequestDTO;
import br.com.ftt.stockmanager.dto.category.CategoryResponseDTO;
import br.com.ftt.stockmanager.model.Category;
import br.com.ftt.stockmanager.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;

    @CrossOrigin
    @GetMapping
    public List<CategoryResponseDTO> index(){
        var category = categoryRepository.findAll();

        return category
                .stream()
                .map(CategoryResponseDTO::parse)
                .collect(Collectors.toList());
    }

    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponseDTO> show(@PathVariable("id") Long id) {
        var category = categoryRepository.findById(id);
        if(!category.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(CategoryResponseDTO.parse(category.get()));
    }

    @CrossOrigin
    @Transactional
    @PostMapping
    public ResponseEntity<CategoryResponseDTO> store(@RequestBody @Valid CategoryRequestDTO categoryToInsert, UriComponentsBuilder uriComponentsBuilder) {
        var category = new Category();

        category.setName(categoryToInsert.getName());
        category.setDescription(categoryToInsert.getDescription());

        categoryRepository.save(category);

        var uri = uriComponentsBuilder
                .path("/category/{id}")
                .buildAndExpand(category.getId())
                .toUri();
        return ResponseEntity.created(uri).body(CategoryResponseDTO.parse(category));
    }

    @CrossOrigin
    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponseDTO> update(@PathVariable Long id, @RequestBody @Valid CategoryRequestDTO categoryToUpdate) {
        var hasCategory = categoryRepository.findById(id);

        if(!hasCategory.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        var category = hasCategory.get();

        category.setName(categoryToUpdate.getName());
        category.setDescription(categoryToUpdate.getDescription());

        categoryRepository.save(category);

        return ResponseEntity.ok(CategoryResponseDTO.parse(category));
    }

    @CrossOrigin
    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<?> destroy(@PathVariable Long id) {
        var hasCategory = categoryRepository.findById(id);

        if(!hasCategory.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        categoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
