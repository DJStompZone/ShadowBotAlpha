{ pkgs }: {
    deps = [
        pkgs.zip
        pkgs.zip
        pkgs.yarn
        pkgs.esbuild
        pkgs.nodejs-16_x

        pkgs.nodePackages.typescript
        pkgs.nodePackages.typescript-language-server
    ];
}