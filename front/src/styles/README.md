#Boilerplate Styles folder

##Folder Structure

    |-- styles
    | |-- generic
    | |-- interactions
    | |-- interfaces
    | |-- templates
    | |-- utilities

    | |-- _base_.scss
    | |-- global.scss
    | |-- global-print.scss


`| |-- generic`
    Contains all generic objects.
    Each type of object should have ONLY its global styles and be class independant as much as possible.

`| |-- interactions`
    Contains all interactions and objects that have interactions.
    An interaction should be specific to an object, and should contain all the states of a behaviour.
    EG: A carousel and all of its behavours
    EG: `.is-selected` `.is-disabled` `.is-active` for an item
    EG: `.is-expanded` for a content area that is toggle-able

`| |-- interfaces`
    Contains all interface objects.
    Interfaces act as definitions for objects and as such, should contain all base **Properties**, **Methods** and **States** for the object.
    The object **inherits** these directly from the interface, and can then be extended to be more specific.
    Interfaces should ALWAYS be mixins and as such cannot be directly applied as classes to any markup.
    There should be **NO LAYOUT** styles unless the object is always and only able to appear in that layout.

    EG:
    Article interface ( microformat ) :
    @mixin i-article {
        .entry-title{}
        .entry-content{}
        .entry-summary{}
        .updated{}
        .published{}
        .author{@include i-hcard;}
        .bookmark (permalink) {}
        .tags{}
    }

    Author interface [ hcard ] ( microformat ) :
    @mixin i-hcard{
        .fn{} //- name
        .n{@include i-name}
        .org{}
        .photo{}
        .url{}
        .email{}
        .tel{}
        .adr{@include i-address;}
        .bday{}
        .category{}
        .note{}
    }

    Name interface ( microformat) :
    @mixin i-name{
        .honorific-prefix{} //- e.g. Ms., Mr., Dr.
        .given-name{}
        .additional-name{}
        .family-name{}
        .honorific-suffix{} //- e.g. Ph.D., Esq.
        .nickname{}
    }

    Address interface ( microformat) :
    @mixin i-address {
        .street-address{}
        .locality{}
        .region{}
        .postal-code{}
        .country-name{}
    }


`| |-- templates`
    Contains all generic objects.
    Each type of objecy should have ONLY its global styles and be relatively class independant.

`| |-- utilities.scss`
    Contains helpers and mixins that are not available in compass that help in construction.
    Two grids are included in this folder:
    Semantic Grid, which uses fluid columns and gutters and offers mixins for pushing and pulling by any number of columns
    Border Box grid, which offers fixed gutters and fluid columns. NB It replies on the loading of an .htc file for IE8 support

    They should be generic and consistent for any site really.

`| |-- _base.scss`
    Contains all global variables for the site.

`| |-- global.scss`
    References all the files it needs to compile the screen css.
    **NB: This file is only used to import other files**


_______
## Notes

NB: If you want fancy ASCII art headings to divide your content use this (append your text to the end of the URL):
http://www.network-science.de/ascii/ascii.php?x=21&y=10&FONT=univers&RICH=no&FORM=left&STRE=yes&WIDT=800&TEXT=History

NB: All files but global.scss are prefixed with an underscore (eg: `_base.scss`) - this is so that they are not compiled with the `watch` command.

NB: when creating new variables in SASS make sure they are namespaced such that names are hierarchical. For instance `$color-grey-dark` **not** `$color-dark-grey`
