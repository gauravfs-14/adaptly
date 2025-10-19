# Jekyll plugin to automatically escape Liquid syntax in code blocks
module Jekyll
  module LiquidEscape
    def self.escape_liquid_in_code_blocks(content)
      # Find all code blocks and escape Liquid syntax
      content.gsub(/```[\s\S]*?```/) do |code_block|
        # Escape {{ and }} in code blocks
        code_block.gsub(/\{\{/, '{{ "{{" }}').gsub(/\}\}/, '{{ "}}" }}')
      end
    end
  end
end

Jekyll::Hooks.register :documents, :pre_render do |doc|
  if doc.content.include?('```')
    doc.content = Jekyll::LiquidEscape.escape_liquid_in_code_blocks(doc.content)
  end
end
